# 💕 Valentine's Day Website

A dreamy, romantic "Will you be my Valentine?" website with playful interactions!

## Features

- 🌸 Beautiful pink, purple, and blue gradient design
- 💖 Floating heart animations
- 🎭 Playful "No" button that shrinks and shows pleading messages
- 🎉 Celebration confetti when "Yes" is clicked
- 📱 Fully responsive design

## Live Demo

After deployment, your website will be available at your CloudFront URL.

## Setup Instructions

### 1. AWS Setup (First Time Only)

Run the CloudFront setup script:

```bash
cd infrastructure
chmod +x setup-cloudfront.sh
./setup-cloudfront.sh
```

This will:
- Configure S3 bucket for static hosting
- Create a CloudFront distribution
- Set up proper bucket policies

**Save the Distribution ID** output by the script!

### 2. GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets → Actions):

| Secret Name | Description |
|------------|-------------|
| `AWS_ACCESS_KEY_ID` | Your AWS Access Key ID |
| `AWS_SECRET_ACCESS_KEY` | Your AWS Secret Access Key |
| `CLOUDFRONT_DISTRIBUTION_ID` | The ID from step 1 |

### 3. Deploy

Push to the `main` branch:

```bash
git add .
git commit -m "💕 Initial Valentine's website"
git push origin main
```

GitHub Actions will automatically:
- Sync files to S3
- Invalidate CloudFront cache

## Local Development

Simply open `index.html` in your browser!

## 💕 Happy Valentine's Day!

Made with love 💖
