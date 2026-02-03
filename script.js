// ============================================
// Valentine's Day Website - Interactive Script
// ============================================

// DOM Elements
const questionCard = document.getElementById('questionCard');
const successCard = document.getElementById('successCard');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const subtitle = document.getElementById('subtitle');
const heartsContainer = document.getElementById('heartsContainer');
const confettiContainer = document.getElementById('confettiContainer');
const buttonsContainer = document.getElementById('buttonsContainer');

// No Button Messages - More messages with escalating pleas!
const noMessages = [
    "Are you sure? 🥺",
    "Please think about it! 😢",
    "Don't break my heart! 💔",
    "I'll be so sad... 😭",
    "Pretty please? 🙏",
    "One more chance? 🥹",
    "I promise to make you happy! 💕",
    "Please say yes... 😿",
    "*cries in corner* 😢💔",
    "My heart can't take this! 💔😭",
    "You're really testing me! 😩",
    "I'll give you chocolates! 🍫",
    "And flowers too! 💐",
    "I'll cook for you! 👨‍🍳",
    "Okay now you're being mean! 😤",
    "Fine, I'll just cry here... 😭",
    "Still no?! 🤯",
    "What if I say please x100? 🥺🙏",
    "I'll never give up! 💪❤️",
    "Last chance... just kidding! 😏"
];

let noClickCount = 0;
let yesButtonScale = 1;

// ============================================
// Initialize Background Hearts
// ============================================
function createFloatingHearts() {
    const hearts = ['💖', '💕', '💗', '💓', '💞', '💝', '🩷', '❤️'];
    
    // Create initial batch of hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createHeart(hearts), i * 500);
    }
    
    // Continue creating hearts
    setInterval(() => createHeart(hearts), 2000);
}

function createHeart(hearts) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Random position and properties
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.opacity = Math.random() * 0.4 + 0.3;
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => heart.remove(), 25000);
}

// ============================================
// Button Event Handlers
// ============================================
function handleYesClick() {
    // Hide question card with animation
    questionCard.style.animation = 'cardExit 0.5s ease forwards';
    
    setTimeout(() => {
        questionCard.classList.add('hidden');
        successCard.classList.remove('hidden');
        
        // Show the big heart popup
        showHeartPopup();
        
        // Celebration effects!
        launchConfetti();
        createHeartBurst();
    }, 500);
}

function showHeartPopup() {
    // Create heart popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'heart-popup-overlay';
    
    const popup = document.createElement('div');
    popup.className = 'heart-popup';
    popup.innerHTML = `
        <div class="big-heart">💖</div>
        <div class="popup-message">You made me the happiest!</div>
        <div class="popup-submessage">I love you forever! 💕</div>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Auto-remove after animation
    setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 500);
    }, 3000);
}

function handleNoClick() {
    noClickCount++;
    
    // Show message in bubble - cycle through messages infinitely
    const messageIndex = (noClickCount - 1) % noMessages.length;
    const message = noMessages[messageIndex];
    
    // Update subtitle with bubble animation
    subtitle.textContent = message;
    subtitle.classList.remove('message-bubble');
    subtitle.offsetHeight; // Trigger reflow
    subtitle.classList.add('message-bubble');
    
    // Make No button jump to random position!
    jumpNoButton();
    
    // Grow the Yes button (cap at 1.8x)
    yesButtonScale = Math.min(yesButtonScale + 0.05, 1.8);
    yesBtn.style.transform = `scale(${yesButtonScale})`;
    
    // After many clicks, make Yes button irresistible
    if (noClickCount >= 5) {
        yesBtn.style.boxShadow = '0 0 30px rgba(236, 72, 153, 0.8)';
        yesBtn.classList.add('mega-pulse');
    }
    
    // No button stays visible forever - just keeps jumping!
}

function jumpNoButton() {
    // Button dimensions (estimate if not yet positioned)
    const btnWidth = 120;
    const btnHeight = 50;
    
    // Safe padding from edges
    const padding = 30;
    
    // Calculate safe bounds within viewport
    const minX = padding;
    const maxX = window.innerWidth - btnWidth - padding;
    const minY = padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    // Generate random position within safe bounds
    let randomX = minX + Math.random() * (maxX - minX);
    let randomY = minY + Math.random() * (maxY - minY);
    
    // Make sure values are positive and valid
    randomX = Math.max(padding, Math.min(randomX, window.innerWidth - btnWidth - padding));
    randomY = Math.max(padding, Math.min(randomY, window.innerHeight - btnHeight - padding));
    
    // Apply the jump with fixed positioning
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1000';
    noBtn.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    noBtn.style.transform = 'scale(1)';
    
    // Add a little shake animation
    noBtn.classList.add('jumped');
    setTimeout(() => noBtn.classList.remove('jumped'), 300);
}

// ============================================
// Celebration Effects
// ============================================
function launchConfetti() {
    const confettiItems = ['💖', '💕', '💗', '🎉', '✨', '🌟', '💝', '🩷', '❤️', '💓', '🎊', '🥳'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = confettiItems[Math.floor(Math.random() * confettiItems.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 80);
    }
}

function createHeartBurst() {
    const burstCount = 30;
    
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart burst-heart';
            heart.textContent = '💖';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '2.5rem';
            
            const angle = (i / burstCount) * Math.PI * 2;
            const distance = 150 + Math.random() * 100;
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;
            
            heart.style.animation = 'none';
            heart.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            heart.style.opacity = '1';
            
            heartsContainer.appendChild(heart);
            
            requestAnimationFrame(() => {
                heart.style.transform = `translate(${targetX}px, ${targetY}px) scale(0)`;
                heart.style.opacity = '0';
            });
            
            setTimeout(() => heart.remove(), 1500);
        }, i * 40);
    }
}

// ============================================
// Add Dynamic Styles
// ============================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes cardExit {
        to {
            opacity: 0;
            transform: scale(0.8) translateY(-30px);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }
    
    .mega-pulse {
        animation: megaPulse 0.5s ease infinite !important;
    }
    
    @keyframes megaPulse {
        0%, 100% { transform: scale(${yesButtonScale}); }
        50% { transform: scale(${yesButtonScale * 1.1}); }
    }
    
    .jumped {
        animation: jumpShake 0.3s ease !important;
    }
    
    @keyframes jumpShake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
    }
`;
document.head.appendChild(dynamicStyles);

// ============================================
// Event Listeners & Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize floating hearts
    createFloatingHearts();
    
    // Button click handlers
    yesBtn.addEventListener('click', handleYesClick);
    noBtn.addEventListener('click', handleNoClick);
    
    // Add hover sound effect simulation (visual feedback)
    yesBtn.addEventListener('mouseenter', () => {
        yesBtn.style.filter = 'brightness(1.1)';
    });
    
    yesBtn.addEventListener('mouseleave', () => {
        yesBtn.style.filter = 'brightness(1)';
    });
    
    // Make No button run away on hover too!
    noBtn.addEventListener('mouseenter', () => {
        if (noClickCount >= 3) {
            jumpNoButton();
        }
    });
    
    // Prevent right-click on No button (playful)
    noBtn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        subtitle.textContent = "Nice try! Just click Yes already! 😏💕";
        subtitle.classList.add('message-bubble');
    });
});

// Easter egg: Konami code reveals extra message
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        subtitle.textContent = "🎮 You found the secret! But still... be my Valentine? 💕";
        subtitle.classList.add('message-bubble');
        launchConfetti();
    }
});
