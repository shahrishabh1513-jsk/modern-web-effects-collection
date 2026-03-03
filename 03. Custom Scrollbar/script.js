// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    

    const styleButtons = document.querySelectorAll('.style-btn');
    const body = document.body;

    // Set default style
    body.classList.add('style-gradient');

    // Style switching functionality
    styleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            styleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get style name
            const style = this.getAttribute('data-style');
            
            // Remove all style classes
            body.className = body.className.split(' ').filter(cls => !cls.startsWith('style-')).join(' ');
            
            // Add new style class
            body.classList.add(`style-${style}`);
            
            // Save preference to localStorage
            localStorage.setItem('preferredScrollbarStyle', style);
            
            // Show notification
            showNotification(`Scrollbar style changed to ${style}`);
        });
    });

    // Load saved style preference
    const savedStyle = localStorage.getItem('preferredScrollbarStyle');
    if (savedStyle) {
        const savedButton = document.querySelector(`[data-style="${savedStyle}"]`);
        if (savedButton) {
            savedButton.click();
        }
    }


    const cardsContainer = document.getElementById('cardsContainer');
    const cardCategories = ['Technology', 'Design', 'Development', 'Tutorial', 'News', 'Review'];
    const cardTitles = [
        'Getting Started with Custom Scrollbars',
        'Modern UI Design Trends 2024',
        'Advanced CSS Techniques',
        'JavaScript Animation Guide',
        'Responsive Web Design Tips',
        'Color Theory in Web Design',
        'Performance Optimization',
        'User Experience Best Practices',
        'Interactive Design Patterns',
        'Frontend Development Updates',
        'CSS Grid Mastery',
        'Flexbox Complete Guide',
        'Animation Performance Tips',
        'Mobile-First Design',
        'Dark Mode Implementation'
    ];

    // Generate 30 cards
    for (let i = 1; i <= 30; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const randomCategory = cardCategories[Math.floor(Math.random() * cardCategories.length)];
        const randomTitle = cardTitles[Math.floor(Math.random() * cardTitles.length)];
        const randomDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
        
        card.innerHTML = `
            <div class="card-icon">
                <i class="fas fa-${getRandomIcon()}"></i>
            </div>
            <h3 class="card-title">${randomTitle}</h3>
            <p class="card-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <div class="card-meta">
                <span class="card-category">${randomCategory}</span>
                <span class="card-date"><i class="far fa-calendar"></i> ${randomDate}</span>
            </div>
        `;
        
        cardsContainer.appendChild(card);
    }

    // Helper function for random icons
    function getRandomIcon() {
        const icons = ['code', 'palette', 'mobile-alt', 'server', 'cloud', 'robot', 'brain', 'rocket', 'globe', 'shield-alt'];
        return icons[Math.floor(Math.random() * icons.length)];
    }


    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
        
        // Update progress circles
        updateProgressCircles(scrolled);
    });


    function updateProgressCircles(scrolled) {
        const circles = document.querySelectorAll('.progress-circle');
        const roundedScrolled = Math.round(scrolled);
        
        // Update first circle with scroll progress
        if (circles[1]) {
            circles[1].style.background = `conic-gradient(var(--primary-color) ${roundedScrolled * 3.6}deg, var(--secondary-color) 0deg)`;
            circles[1].querySelector('span').textContent = roundedScrolled + '%';
        }
        
        // Animate other circles
        circles.forEach((circle, index) => {
            if (index !== 1) {
                const progress = parseInt(circle.getAttribute('data-progress'));
                circle.style.background = `conic-gradient(var(--primary-color) ${progress * 3.6}deg, var(--secondary-color) 0deg)`;
            }
        });
    }

    // Initialize progress circles
    setTimeout(() => {
        updateProgressCircles(0);
    }, 100);


    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
            showNotification('Light theme activated');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
            showNotification('Dark theme activated');
        }
    });


    function showNotification(message, duration = 3000) {
        // Remove existing notification
        const existingNotif = document.querySelector('.notification');
        if (existingNotif) {
            existingNotif.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: var(--gradient-1);
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            font-size: 0.9rem;
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        `;
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove after duration
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }, duration);
    }


    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loading.classList.add('fade-out');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 500);
    });


    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });


    document.addEventListener('keydown', function(e) {
        // Ctrl + T for theme toggle
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            themeToggle.click();
        }
        
        // Ctrl + H for home (scroll to top)
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            scrollTopBtn.click();
        }
        
        // Number keys for style switching (1-0)
        if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
            const key = parseInt(e.key);
            if (key >= 1 && key <= 9) {
                e.preventDefault();
                const styleBtn = document.querySelector(`.style-btn:nth-child(${key})`);
                if (styleBtn) styleBtn.click();
            } else if (e.key === '0') {
                e.preventDefault();
                const styleBtn = document.querySelector('.style-btn:nth-child(10)');
                if (styleBtn) styleBtn.click();
            }
        }
    });

    const scrollbarWidthInput = document.createElement('input');
    scrollbarWidthInput.type = 'range';
    scrollbarWidthInput.min = '4';
    scrollbarWidthInput.max = '20';
    scrollbarWidthInput.value = '16';
    scrollbarWidthInput.className = 'width-slider';
    
    // Add slider to style selector
    const styleSelector = document.querySelector('.style-selector');
    const widthControl = document.createElement('div');
    widthControl.className = 'width-control';
    widthControl.innerHTML = `
        <h4><i class="fas fa-arrows-alt-h"></i> Scrollbar Width</h4>
        <div class="slider-container">
            <input type="range" min="4" max="20" value="16" class="width-slider" id="scrollbarWidth">
            <span id="widthValue">16px</span>
        </div>
    `;
    
    widthControl.style.cssText = `
        margin-top: 20px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 10px;
    `;
    
    styleSelector.appendChild(widthControl);
    
    const widthSlider = document.getElementById('scrollbarWidth');
    const widthValue = document.getElementById('widthValue');
    
    widthSlider.addEventListener('input', function() {
        const width = this.value;
        widthValue.textContent = width + 'px';
        document.documentElement.style.setProperty('--scrollbar-width', width + 'px');
        
        // Update scrollbar width
        const style = document.createElement('style');
        style.textContent = `
            ::-webkit-scrollbar {
                width: ${width}px;
            }
        `;
        
        // Remove previous dynamic style
        const oldStyle = document.getElementById('dynamicScrollbarStyle');
        if (oldStyle) oldStyle.remove();
        
        style.id = 'dynamicScrollbarStyle';
        document.head.appendChild(style);
    });

    console.log('Modern Custom Scrollbar initialized successfully!');
});