document.addEventListener('DOMContentLoaded', () => {
    // 1. MAGNETIC BUTTON PHYSICS
    const magneticBtns = document.querySelectorAll('.magnetic-wrap');
    
    magneticBtns.forEach(wrap => {
        const btn = wrap.querySelector('.magnetic');
        
        wrap.addEventListener('mousemove', (e) => {
            const rect = wrap.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move the button towards the cursor (physics-based attraction)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        wrap.addEventListener('mouseleave', () => {
            // Snap back
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // 2. REVEAL ON SCROLL (STAGGERED)
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(el => revealObserver.observe(el));

    // 3. NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. SMOOTH ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. PRICING CARD HOVER EFFECTS
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        const effectContainer = card.querySelector('.effect-container');
        
        card.addEventListener('mouseenter', () => {
            // Clear any existing effects
            effectContainer.innerHTML = '';
            
            // Add appropriate effect based on card type
            if (card.querySelector('.tier').textContent.includes('Pro')) {
                // Star effect for Pro tier
                const star = document.createElement('div');
                star.className = 'star-effect';
                effectContainer.appendChild(star);
                
                // Trigger animation
                setTimeout(() => {
                    star.style.opacity = '1';
                    star.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1.2)';
                }, 10);
            } else if (card.querySelector('.tier').textContent.includes('Elite')) {
                // Gem effect for Elite tier
                const gem = document.createElement('div');
                gem.className = 'gem-effect';
                effectContainer.appendChild(gem);
                
                // Trigger animation
                setTimeout(() => {
                    gem.style.opacity = '1';
                    gem.style.transform = 'translate(-50%, -50%) rotate(180deg) scale(1.1)';
                }, 10);
            } else if (card.querySelector('.tier').textContent.includes('Unlimited')) {
                // Rocket effect for Unlimited tier
                const rocket = document.createElement('div');
                rocket.className = 'rocket-effect';
                effectContainer.appendChild(rocket);
                
                // Trigger animation
                setTimeout(() => {
                    rocket.style.opacity = '1';
                    rocket.style.transform = 'translateX(-50%) translateY(-30px)';
                }, 10);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset effects
            effectContainer.innerHTML = '';
        });
    });
});
