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

// Flirty messages that appear ON the No button
const noButtonMessages = [
    "No 😅",
    "Are you sure? 🥺",
    "Really? 😢",
    "Think again! 💭",
    "Please? 🙏",
    "I'll be sad 😭",
    "Don't do this! 💔",
    "Pretty please? 🥹",
    "I'll cry! 😿",
    "Reconsider? 💕",
    "Just say yes! 😍",
    "C'mon! 🌹",
    "I'll wait... ⏳",
    "Forever? 💗",
    "One chance? 🎀",
    "I love you! 💖",
    "Say yes! 💝",
    "Please!! 😩",
    "Yes? 👉👈",
    "Okay fine... 😔"
];

let noClickCount = 0;
let yesButtonScale = 1;

// ============================================
// Initialize Background Hearts
// ============================================
function createFloatingHearts() {
    const hearts = ['💖', '💕', '💗', '💓', '💞', '💝', '🩷', '❤️'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createHeart(hearts), i * 500);
    }
    
    setInterval(() => createHeart(hearts), 2000);
}

function createHeart(hearts) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.opacity = Math.random() * 0.4 + 0.3;
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 25000);
}

// ============================================
// Button Event Handlers
// ============================================
function handleYesClick() {
    questionCard.style.animation = 'cardExit 0.5s ease forwards';
    
    // Hide the No button too
    noBtn.style.display = 'none';
    
    setTimeout(() => {
        questionCard.classList.add('hidden');
        successCard.classList.remove('hidden');
        
        showHeartPopup();
        launchConfetti();
        createHeartBurst();
    }, 500);
}

function showHeartPopup() {
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
    
    setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 500);
    }, 3000);
}

function handleNoClick() {
    noClickCount++;
    
    // Change the text on the No button itself
    const messageIndex = noClickCount % noButtonMessages.length;
    noBtn.innerHTML = `<span class="btn-text">${noButtonMessages[messageIndex]}</span>`;
    
    // Make the No button jump to a new position
    jumpNoButton();
    
    // Make the Yes button BIGGER with each click!
    yesButtonScale += 0.15;
    yesBtn.style.transform = `scale(${yesButtonScale})`;
    
    // Add glow effect after a few clicks
    if (noClickCount >= 3) {
        yesBtn.style.boxShadow = `0 0 ${20 + noClickCount * 5}px rgba(236, 72, 153, 0.8)`;
    }
    
    // Update subtitle with encouragement
    const subtitles = [
        "I have something special to ask you...",
        "Come on, you know you want to! 😏",
        "The Yes button is looking prettier! 💕",
        "Just one little click on Yes! ✨",
        "I promise it'll be worth it! 🌹",
        "You're making me work for it! 😅",
        "The Yes button is growing... 👀",
        "Almost there, just click Yes! 💖"
    ];
    subtitle.textContent = subtitles[Math.min(noClickCount, subtitles.length - 1)];
}

function jumpNoButton() {
    // Array of positions around the viewport (staying away from center)
    const positions = [
        { left: '15%', top: '15%' },
        { left: '85%', top: '15%' },
        { left: '15%', top: '85%' },
        { left: '85%', top: '85%' },
        { left: '10%', top: '50%' },
        { left: '90%', top: '50%' },
        { left: '50%', top: '10%' },
        { left: '50%', top: '90%' },
        { left: '25%', top: '25%' },
        { left: '75%', top: '25%' },
        { left: '25%', top: '75%' },
        { left: '75%', top: '75%' },
        { left: '20%', top: '40%' },
        { left: '80%', top: '40%' },
        { left: '20%', top: '60%' },
        { left: '80%', top: '60%' },
    ];
    
    // Pick random position
    const pos = positions[Math.floor(Math.random() * positions.length)];
    
    // Apply position with fixed positioning
    noBtn.style.position = 'fixed';
    noBtn.style.left = pos.left;
    noBtn.style.top = pos.top;
    noBtn.style.transform = 'translate(-50%, -50%)';
    noBtn.style.zIndex = '9999';
    noBtn.style.transition = 'left 0.25s ease-out, top 0.25s ease-out';
    noBtn.style.pointerEvents = 'auto';
    
    // Quick shake animation
    noBtn.style.animation = 'none';
    noBtn.offsetHeight; // Reflow
    noBtn.style.animation = 'buttonShake 0.3s ease';
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
    
    @keyframes buttonShake {
        0%, 100% { rotate: 0deg; }
        25% { rotate: -10deg; }
        75% { rotate: 10deg; }
    }
`;
document.head.appendChild(dynamicStyles);

// ============================================
// Event Listeners & Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    
    yesBtn.addEventListener('click', handleYesClick);
    noBtn.addEventListener('click', handleNoClick);
    
    // Make Yes button glow on hover
    yesBtn.addEventListener('mouseenter', () => {
        yesBtn.style.filter = 'brightness(1.15)';
    });
    
    yesBtn.addEventListener('mouseleave', () => {
        yesBtn.style.filter = 'brightness(1)';
    });
    
    // Easter egg: right-click No button
    noBtn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        noBtn.innerHTML = '<span class="btn-text">Nice try! 😏</span>';
        jumpNoButton();
    });
});

// Konami code easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        subtitle.textContent = "🎮 Secret found! But still... be my Valentine? 💕";
        launchConfetti();
    }
});
