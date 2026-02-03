#!/bin/bash
# ============================================
# CloudFront Distribution Setup for Valentine's Website
# Run this script once to create the CloudFront distribution
# ============================================

set -e

BUCKET_NAME="be-my-valentine-project"
REGION="ap-south-1"

echo "🌸 Setting up CloudFront for Valentine's Day Website..."
echo ""

# Step 1: Configure S3 bucket for static website hosting
echo "📦 Configuring S3 bucket for static website hosting..."

aws s3api put-bucket-website \
    --bucket $BUCKET_NAME \
    --website-configuration '{
        "IndexDocument": {"Suffix": "index.html"},
        "ErrorDocument": {"Key": "index.html"}
    }' \
    --region $REGION

echo "✅ S3 website configuration complete"

# Step 2: Create bucket policy for public read access (required for CloudFront OAC)
echo "🔓 Setting up bucket policy..."

# First, let's create the CloudFront distribution with OAC
echo ""
echo "☁️ Creating CloudFront distribution..."

# Create Origin Access Control
OAC_ID=$(aws cloudfront create-origin-access-control \
    --origin-access-control-config '{
        "Name": "valentine-oac",
        "Description": "OAC for Valentine Website S3 bucket",
        "SigningProtocol": "sigv4",
        "SigningBehavior": "always",
        "OriginAccessControlOriginType": "s3"
    }' \
    --query 'OriginAccessControl.Id' \
    --output text 2>/dev/null || echo "")

if [ -z "$OAC_ID" ]; then
    echo "OAC might already exist, fetching existing one..."
    OAC_ID=$(aws cloudfront list-origin-access-controls \
        --query "OriginAccessControlList.Items[?Name=='valentine-oac'].Id | [0]" \
        --output text)
fi

echo "OAC ID: $OAC_ID"

# Create CloudFront distribution
DISTRIBUTION_CONFIG=$(cat <<EOF
{
    "CallerReference": "valentine-$(date +%s)",
    "Comment": "Valentine's Day Website Distribution",
    "Enabled": true,
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-${BUCKET_NAME}",
                "DomainName": "${BUCKET_NAME}.s3.${REGION}.amazonaws.com",
                "S3OriginConfig": {
                    "OriginAccessIdentity": ""
                },
                "OriginAccessControlId": "${OAC_ID}"
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-${BUCKET_NAME}",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
        "Compress": true
    },
    "PriceClass": "PriceClass_All",
    "ViewerCertificate": {
        "CloudFrontDefaultCertificate": true
    },
    "CustomErrorResponses": {
        "Quantity": 1,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    }
}
EOF
)

# Create the distribution
RESULT=$(aws cloudfront create-distribution \
    --distribution-config "$DISTRIBUTION_CONFIG" \
    --query '{Id: Distribution.Id, DomainName: Distribution.DomainName, ARN: Distribution.ARN}' \
    --output json)

DISTRIBUTION_ID=$(echo $RESULT | jq -r '.Id')
DOMAIN_NAME=$(echo $RESULT | jq -r '.DomainName')
DISTRIBUTION_ARN=$(echo $RESULT | jq -r '.ARN')

echo ""
echo "✅ CloudFront distribution created!"
echo ""
echo "📋 IMPORTANT DETAILS - SAVE THESE:"
echo "=================================="
echo "Distribution ID: $DISTRIBUTION_ID"
echo "CloudFront Domain: $DOMAIN_NAME"
echo "Distribution ARN: $DISTRIBUTION_ARN"
echo ""

# Step 3: Update S3 bucket policy to allow CloudFront access
echo "🔐 Updating S3 bucket policy for CloudFront access..."

BUCKET_POLICY=$(cat <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipalReadOnly",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${BUCKET_NAME}/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "${DISTRIBUTION_ARN}"
                }
            }
        }
    ]
}
EOF
)

aws s3api put-bucket-policy \
    --bucket $BUCKET_NAME \
    --policy "$BUCKET_POLICY" \
    --region $REGION

echo "✅ Bucket policy updated"
echo ""
echo "=========================================="
echo "🎉 SETUP COMPLETE!"
echo "=========================================="
echo ""
echo "📝 NEXT STEPS:"
echo "1. Add CLOUDFRONT_DISTRIBUTION_ID secret to GitHub:"
echo "   Value: $DISTRIBUTION_ID"
echo ""
echo "2. Your website will be available at:"
echo "   https://$DOMAIN_NAME"
echo ""
echo "3. To use your custom domain, update CloudFront"
echo "   distribution with your domain and SSL certificate."
echo ""
echo "💕 Happy Valentine's Day! 💕"
