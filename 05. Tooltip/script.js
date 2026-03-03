// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    const styleButtons = document.querySelectorAll('.style-btn');
    const body = document.body;

    // Set default style
    body.classList.add('style-default');

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
            localStorage.setItem('preferredTooltipStyle', style);
            
            // Show notification
            showNotification(`Tooltip style changed to ${style}`);
        });
    });

    // Load saved style preference
    const savedStyle = localStorage.getItem('preferredTooltipStyle');
    if (savedStyle) {
        const savedButton = document.querySelector(`[data-style="${savedStyle}"]`);
        if (savedButton) {
            savedButton.click();
        }
    }

    const positionButtons = document.querySelectorAll('.position-btn');
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    positionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            positionButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get position
            const position = this.getAttribute('data-position');
            
            // Update all tooltips position
            tooltipElements.forEach(el => {
                el.setAttribute('data-position', position);
            });
            
            // Show notification
            showNotification(`Tooltip position changed to ${position}`);
        });
    });


    const fab = document.getElementById('fab');
    const settingsPanel = document.getElementById('settingsPanel');
    const closePanel = document.querySelector('.close-panel');
    
    fab.addEventListener('click', () => {
        settingsPanel.classList.toggle('active');
    });
    
    closePanel.addEventListener('click', () => {
        settingsPanel.classList.remove('active');
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && !fab.contains(e.target)) {
            settingsPanel.classList.remove('active');
        }
    });

    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    const offsetSlider = document.getElementById('offsetSlider');
    const offsetValue = document.getElementById('offsetValue');
    const fontSlider = document.getElementById('fontSlider');
    const fontValue = document.getElementById('fontValue');
    const roundedCheckbox = document.getElementById('roundedCheckbox');
    const shadowCheckbox = document.getElementById('shadowCheckbox');
    
    // Speed control
    speedSlider.addEventListener('input', function() {
        const speed = this.value;
        speedValue.textContent = speed + 's';
        document.documentElement.style.setProperty('--tooltip-speed', speed + 's');
    });
    
    // Offset control
    offsetSlider.addEventListener('input', function() {
        const offset = this.value;
        offsetValue.textContent = offset + 'px';
        document.documentElement.style.setProperty('--tooltip-offset', offset + 'px');
    });
    
    // Font size control
    fontSlider.addEventListener('input', function() {
        const size = this.value;
        fontValue.textContent = size + 'px';
        document.documentElement.style.setProperty('--tooltip-font-size', size + 'px');
    });
    
    // Rounded corners control
    roundedCheckbox.addEventListener('change', function() {
        tooltipElements.forEach(el => {
            if (this.checked) {
                el.style.setProperty('--tooltip-border-radius', '6px');
            } else {
                el.style.setProperty('--tooltip-border-radius', '0px');
            }
        });
    });
    
    // Shadow control
    shadowCheckbox.addEventListener('change', function() {
        tooltipElements.forEach(el => {
            if (this.checked) {
                el.style.setProperty('--tooltip-box-shadow', 'var(--shadow-2)');
            } else {
                el.style.setProperty('--tooltip-box-shadow', 'none');
            }
        });
    });


    // Add tooltips to form labels
    const formLabels = document.querySelectorAll('.form-group label');
    formLabels.forEach(label => {
        label.setAttribute('data-tooltip', label.getAttribute('data-tooltip'));
    });
    
    // Add tooltips to showcase items
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
        const tooltip = item.getAttribute('data-tooltip');
        const position = item.getAttribute('data-position') || 'top';
        item.setAttribute('data-tooltip', tooltip);
        item.setAttribute('data-position', position);
    });


    document.addEventListener('keydown', function(e) {
        // Ctrl + S for settings toggle
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            fab.click();
        }
        
        // Number keys for styles (1-8)
        if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
            const key = parseInt(e.key);
            if (key >= 1 && key <= 8 && styleButtons[key - 1]) {
                e.preventDefault();
                styleButtons[key - 1].click();
            }
        }
        
        // P keys for positions (1-4)
        if (e.altKey) {
            const key = parseInt(e.key);
            if (key >= 1 && key <= 4 && positionButtons[key - 1]) {
                e.preventDefault();
                positionButtons[key - 1].click();
            }
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
        
        document.body.appendChild(notification);
        
        // Remove after duration
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
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


    const randomTooltips = [
        "Did you know?",
        "✨ Special offer!",
        "🔔 New message",
        "💡 Pro tip",
        "⚠️ Warning!",
        "✅ Success!",
        "❌ Error!",
        "ℹ️ Information",
        "🎉 Congratulations!",
        "🔥 Hot deal!"
    ];
    
    // Add random tooltips to some elements
    const randomElements = document.querySelectorAll('.tooltip-trigger:not([data-tooltip])');
    randomElements.forEach((el, index) => {
        const randomTip = randomTooltips[index % randomTooltips.length];
        el.setAttribute('data-tooltip', randomTip);
    });


    // Handle HTML tooltips (images, icons, etc.)
    const htmlTooltips = document.querySelectorAll('[data-tooltip*="<"]');
    htmlTooltips.forEach(el => {
        const content = el.getAttribute('data-tooltip');
        // Store HTML content as is - browser will render it
    });


    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('[data-tooltip]');
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function(e) {
                e.preventDefault();
                // Show tooltip on touch
                this.classList.add('touch-active');
                
                // Hide after 2 seconds
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 2000);
            });
        });
    }


    function trackTooltipHover(element) {
        const tooltip = element.getAttribute('data-tooltip');
        console.log(`Tooltip shown: ${tooltip.substring(0, 30)}...`);
    }
    
    // Track tooltip hovers
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', () => trackTooltipHover(el));
    });


    console.log('Modern Tooltips initialized successfully!');
    console.log(`Total tooltips: ${tooltipElements.length}`);
    console.log(`Available styles: 8`);
    console.log(`Available positions: 4`);
});