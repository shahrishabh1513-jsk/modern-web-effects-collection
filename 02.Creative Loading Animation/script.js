/*
window.addEventListener('load', function() {
    // Create loading overlay
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loader-modern">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Remove overlay after page loads
    setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.remove();
        }, 1000);
    }, 1500);
});
*/

// Add theme toggle functionality
const createThemeToggle = () => {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            toggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            toggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    });
    document.body.appendChild(toggle);
};


// createThemeToggle();

// Add random color generator for animations
const randomizeColors = () => {
    const colors = [
        '#667eea', '#764ba2', '#00d2ff', '#00b894', '#fdcb6e', 
        '#e17055', '#9b59b6', '#3498db', '#2ecc71', '#f1c40f',
        '#e67e22', '#e74c3c', '#fd79a8'
    ];
    
    document.querySelectorAll('.dot, .ball, .neon-circle').forEach(el => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.background = randomColor;
    });
};

// Uncomment to randomize colors every 5 seconds
// setInterval(randomizeColors, 5000);

console.log('Creative Loading Animations loaded!');