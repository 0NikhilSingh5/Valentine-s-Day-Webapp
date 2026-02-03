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

// No Button Messages - Escalating pleas!
const noMessages = [
    { text: "Are you sure? 🥺", size: 1 },
    { text: "Please think about it! 😢", size: 0.95 },
    { text: "Don't break my heart! 💔", size: 0.9 },
    { text: "I'll be so sad... 😭", size: 0.85 },
    { text: "Pretty please? 🙏", size: 0.8 },
    { text: "One more chance? 🥹", size: 0.75 },
    { text: "I promise to make you happy! 💕", size: 0.7 },
    { text: "Please say yes... 😿", size: 0.65 },
    { text: "*cries in corner* 😢💔", size: 0.6 },
    { text: "My heart can't take this! 💔😭", size: 0.55 }
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
        
        // Celebration effects!
        launchConfetti();
        createHeartBurst();
    }, 500);
}

function handleNoClick() {
    noClickCount++;
    
    if (noClickCount <= noMessages.length) {
        const message = noMessages[noClickCount - 1];
        
        // Update subtitle with pleading message
        subtitle.textContent = message.text;
        subtitle.style.animation = 'none';
        subtitle.offsetHeight; // Trigger reflow
        subtitle.style.animation = 'shake 0.5s ease';
        
        // Shrink the No button
        noBtn.style.transform = `scale(${message.size})`;
        noBtn.style.opacity = message.size;
        
        // Grow the Yes button!
        yesButtonScale += 0.1;
        yesBtn.style.transform = `scale(${yesButtonScale})`;
        
        // Make No button run away occasionally
        if (noClickCount % 3 === 0) {
            noBtn.classList.add('running-away');
            setTimeout(() => noBtn.classList.remove('running-away'), 400);
        }
        
        // After many clicks, make Yes button irresistible
        if (noClickCount >= 5) {
            yesBtn.style.boxShadow = '0 0 30px rgba(236, 72, 153, 0.8)';
            yesBtn.classList.add('mega-pulse');
        }
        
        // Eventually "disable" the No button
        if (noClickCount >= noMessages.length) {
            noBtn.style.visibility = 'hidden';
            subtitle.textContent = "There's only one option now! 😉💕";
        }
    }
}

// ============================================
// Celebration Effects
// ============================================
function launchConfetti() {
    const confettiItems = ['💖', '💕', '💗', '🎉', '✨', '🌟', '💝', '🩷', '❤️', '💓'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = confettiItems[Math.floor(Math.random() * confettiItems.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 100);
    }
}

function createHeartBurst() {
    const burstCount = 20;
    
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '💖';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '2rem';
            
            const angle = (i / burstCount) * Math.PI * 2;
            const distance = 200;
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
        }, i * 50);
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
    
    // Prevent right-click on No button (playful)
    noBtn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        subtitle.textContent = "Nice try! Just click Yes already! 😏💕";
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
        launchConfetti();
    }
});
