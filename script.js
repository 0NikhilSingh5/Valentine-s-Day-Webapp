// ============================================
// Valentine's Day Website - Interactive Script
// ============================================

// DOM Elements
const questionArea = document.getElementById('questionArea');
const successScreen = document.getElementById('successScreen');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const heartsContainer = document.getElementById('heartsContainer');
const confettiContainer = document.getElementById('confettiContainer');

// Flirty messages for the No button
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
// Floating Hearts
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
// Yes Button Handler
// ============================================
function handleYesClick() {
    // Hide everything and show success
    questionArea.classList.add('hidden');
    noBtn.style.display = 'none';
    successScreen.classList.remove('hidden');
    
    showHeartPopup();
    launchConfetti();
    createHeartBurst();
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

// ============================================
// No Button Handler - Jumps All Over Screen!
// ============================================
function handleNoClick() {
    noClickCount++;
    
    // Change the text on the No button
    const messageIndex = noClickCount % noButtonMessages.length;
    noBtn.innerHTML = `<span class="btn-text">${noButtonMessages[messageIndex]}</span>`;
    
    // Make the No button jump to a random position on screen
    jumpNoButton();
    
    // Make the Yes button BIGGER!
    yesButtonScale += 0.12;
    yesBtn.style.transform = `scale(${yesButtonScale})`;
    
    // Add growing glow effect
    if (noClickCount >= 2) {
        const glowSize = 20 + noClickCount * 8;
        yesBtn.style.boxShadow = `0 0 ${glowSize}px rgba(147, 51, 234, 0.7)`;
    }
}

function jumpNoButton() {
    // Random position anywhere on the screen (with safe margins)
    const margin = 80; // Keep away from edges
    const btnWidth = 150;
    const btnHeight = 50;
    
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;
    
    const randomX = margin + Math.random() * (maxX - margin);
    const randomY = margin + Math.random() * (maxY - margin);
    
    // Apply the new position
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.right = 'auto';
    noBtn.style.bottom = 'auto';
    noBtn.style.transform = 'none';
    noBtn.style.transition = 'left 0.2s ease-out, top 0.2s ease-out';
}

// ============================================
// Celebration Effects
// ============================================
function launchConfetti() {
    const confettiItems = ['💖', '💕', '💗', '🎉', '✨', '🌟', '💝', '🩷', '❤️', '💓', '🎊', '🥳'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = confettiItems[Math.floor(Math.random() * confettiItems.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 60);
    }
}

function createHeartBurst() {
    const burstCount = 30;
    
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '💖';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '3rem';
            
            const angle = (i / burstCount) * Math.PI * 2;
            const distance = 200 + Math.random() * 100;
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
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    
    yesBtn.addEventListener('click', handleYesClick);
    noBtn.addEventListener('click', handleNoClick);
    
    // Hover effects
    yesBtn.addEventListener('mouseenter', () => {
        yesBtn.style.filter = 'brightness(1.1)';
    });
    
    yesBtn.addEventListener('mouseleave', () => {
        yesBtn.style.filter = 'brightness(1)';
    });
    
    // Right-click easter egg
    noBtn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        noBtn.innerHTML = '<span class="btn-text">Nice try! 😏</span>';
        jumpNoButton();
    });
});
