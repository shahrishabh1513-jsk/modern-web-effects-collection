// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    

    const images = [
        {
            url: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Mountain Landscape',
            description: 'Beautiful mountain view with sunset colors',
            category: 'nature',
            tags: ['nature', 'mountains', 'sunset']
        },
        {
            url: 'https://images.unsplash.com/photo-1502228213426-d4e9f2add0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'City Lights',
            description: 'Urban夜景 with vibrant city lights',
            category: 'urban',
            tags: ['city', 'night', 'lights']
        },
        {
            url: 'https://images.unsplash.com/photo-1519757043093-285fcb07a4e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Ocean Waves',
            description: 'Peaceful ocean waves crashing on shore',
            category: 'nature',
            tags: ['ocean', 'waves', 'beach']
        },
        {
            url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Forest Path',
            description: 'Mystical forest with sun rays',
            category: 'nature',
            tags: ['forest', 'trees', 'nature']
        },
        {
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Sunrise in Forest',
            description: 'Golden sunrise through the trees',
            category: 'nature',
            tags: ['sunrise', 'forest', 'golden']
        },
        {
            url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Lake Reflection',
            description: 'Perfect mirror lake reflection',
            category: 'nature',
            tags: ['lake', 'reflection', 'water']
        },
        {
            url: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Northern Lights',
            description: 'Aurora borealis dancing in the sky',
            category: 'nature',
            tags: ['aurora', 'northern lights', 'night']
        },
        {
            url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Autumn Forest',
            description: 'Colorful autumn leaves in forest',
            category: 'nature',
            tags: ['autumn', 'forest', 'leaves']
        }
    ];


    const effects = [
        'clip1', 'clip2', 'clip3', 'overlay1', 'zoom',
        'blur', 'grayscale', 'sepia', 'invert', 'flip',
        'skew', '3d', 'glitch', 'shine', 'pulse',
        'border', 'wave', 'smoke'
    ];


    const galleryGrid = document.getElementById('galleryGrid');
    
    function generateGallery(filter = 'all') {
        galleryGrid.innerHTML = '';
        
        images.forEach((image, index) => {
            // Apply filter
            if (filter !== 'all' && image.category !== filter) {
                return;
            }
            
            const card = document.createElement('div');
            card.className = `card effect-${effects[index % effects.length]}`;
            card.setAttribute('data-index', index);
            
            // Random date for variety
            const randomDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="${image.url}" alt="${image.title}" loading="lazy">
                </div>
                <div class="card-overlay">
                    <h3 class="card-title">${image.title}</h3>
                    <p class="card-description">${image.description}</p>
                    <div class="card-tags">
                        ${image.tags.map(tag => `<span class="card-tag">#${tag}</span>`).join('')}
                    </div>
                    <div class="card-meta" style="margin-top: 15px; color: var(--text-secondary); font-size: 0.8rem;">
                        <i class="far fa-calendar"></i> ${randomDate}
                    </div>
                </div>
            `;
            
            // Add click event for lightbox
            card.addEventListener('click', () => openLightbox(index, filter));
            
            galleryGrid.appendChild(card);
        });
    }

    // Initialize gallery
    generateGallery();


    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category
            const category = this.getAttribute('data-category');
            
            // Filter gallery
            generateGallery(category);
        });
    });


    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let currentFilter = 'all';
    
    function openLightbox(index, filter) {
        currentImageIndex = index;
        currentFilter = filter;
        
        // Get filtered images
        const filteredImages = filter === 'all' 
            ? images 
            : images.filter(img => img.category === filter);
        
        const image = filteredImages[index];
        
        lightboxImg.src = image.url;
        lightboxCaption.innerHTML = `
            <h3>${image.title}</h3>
            <p>${image.description}</p>
            <div style="margin-top: 10px;">
                ${image.tags.map(tag => `<span style="margin: 0 5px; color: var(--primary-color);">#${tag}</span>`).join('')}
            </div>
        `;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function navigateLightbox(direction) {
        // Get filtered images
        const filteredImages = currentFilter === 'all' 
            ? images 
            : images.filter(img => img.category === currentFilter);
        
        currentImageIndex = (currentImageIndex + direction + filteredImages.length) % filteredImages.length;
        
        const image = filteredImages[currentImageIndex];
        lightboxImg.src = image.url;
        lightboxCaption.innerHTML = `
            <h3>${image.title}</h3>
            <p>${image.description}</p>
            <div style="margin-top: 10px;">
                ${image.tags.map(tag => `<span style="margin: 0 5px; color: var(--primary-color);">#${tag}</span>`).join('')}
            </div>
        `;
    }
    
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));
    
    // Close lightbox with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Navigate with arrow keys
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });


    const fab = document.getElementById('fab');
    const effectsPanel = document.getElementById('effectsPanel');
    const closePanel = document.querySelector('.close-panel');
    
    fab.addEventListener('click', () => {
        effectsPanel.classList.toggle('active');
    });
    
    closePanel.addEventListener('click', () => {
        effectsPanel.classList.remove('active');
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!effectsPanel.contains(e.target) && !fab.contains(e.target)) {
            effectsPanel.classList.remove('active');
        }
    });


    const effectItems = document.querySelectorAll('.effect-item');
    const cards = document.querySelectorAll('.card');
    
    effectItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all effect items
            effectItems.forEach(ei => ei.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get effect name
            const effect = this.getAttribute('data-effect');
            
            // Apply effect to all cards
            cards.forEach(card => {
                // Remove all effect classes
                effects.forEach(e => {
                    card.classList.remove(`effect-${e}`);
                });
                
                // Add new effect
                card.classList.add(`effect-${effect}`);
            });
            
            // Show notification
            showNotification(`Effect: ${effect} applied to all cards`);
            
            // Close panel
            effectsPanel.classList.remove('active');
        });
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
            bottom: 100px;
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
            box-shadow: var(--shadow-2);
        `;
        
        // Add animation keyframes if not exists
        if (!document.querySelector('#notificationStyles')) {
            const style = document.createElement('style');
            style.id = 'notificationStyles';
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
        }
        
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


    document.addEventListener('keydown', function(e) {
        // Ctrl + F for FAB toggle
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            fab.click();
        }
        
        // Number keys for effects (1-9)
        if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
            const key = parseInt(e.key);
            if (key >= 1 && key <= 9 && effectItems[key - 1]) {
                e.preventDefault();
                effectItems[key - 1].click();
            }
        }
    });

    const randomEffectBtn = document.createElement('button');
    randomEffectBtn.className = 'fab';
    randomEffectBtn.style.bottom = '100px';
    randomEffectBtn.style.right = '30px';
    randomEffectBtn.style.width = '50px';
    randomEffectBtn.style.height = '50px';
    randomEffectBtn.style.padding = '0';
    randomEffectBtn.style.justifyContent = 'center';
    randomEffectBtn.innerHTML = '<i class="fas fa-random"></i>';
    randomEffectBtn.title = 'Random Effect';
    
    randomEffectBtn.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * effectItems.length);
        effectItems[randomIndex].click();
    });
    
    document.body.appendChild(randomEffectBtn);


    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    console.log('Creative Image Hover Effects initialized successfully!');
});