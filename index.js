document.addEventListener('DOMContentLoaded', () => {
    // Navbar toggle
    const navbar = document.querySelector('.navbar');
    const menuBar = document.querySelector('#menu-bar');
    const search = document.querySelector('.search');
    const searchBtn = document.querySelector('#search');

    menuBar.addEventListener('click', () => {
        navbar.classList.toggle('active');
        search.classList.remove('active');
    });

    searchBtn.addEventListener('click', () => {
        search.classList.toggle('active');
        navbar.classList.remove('active');
    });

    // Initialize Swiper instances with delay
    const swiperConfigs = [
        {
            selector: '.product-row',
            options: {
                spaceBetween: 20,
                loop: true,
                centeredSlides: false,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: true, // Pause on interaction
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    0: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 15 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                },
                speed: 600,
                grabCursor: true,
                slidesOffsetBefore: 10,
                slidesOffsetAfter: 10,
            }
        },
        {
            selector: '.blogs-row',
            options: {
                spaceBetween: 30,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                },
                speed: 800,
                grabCursor: true,
            }
        },
        {
            selector: '.review-row',
            options: {
                spaceBetween: 15,
                loop: true,
                centeredSlides: false,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: true, // Pause on interaction
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    0: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 15 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                },
                speed: 600,
                grabCursor: true,
                slidesOffsetBefore: 10,
                slidesOffsetAfter: 10,
            }
        }
    ];

    // Initialize Swipers with delay
    setTimeout(() => {
        swiperConfigs.forEach(config => {
            try {
                new Swiper(config.selector, config.options);
            } catch (error) {
                console.error(`Failed to initialize Swiper for ${config.selector}:`, error);
            }
        });
    }, 200); // Delay for image loading

    // Smooth scroll for navbar and footer links
    document.querySelectorAll('.navbar a, .footer a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    navbar.classList.remove('active');
                }
            }
        });
    });

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuBar.contains(e.target)) {
            navbar.classList.remove('active');
        }
        if (!search.contains(e.target) && !searchBtn.contains(e.target)) {
            search.classList.remove('active');
        }
    });

    // Handle image load errors
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.src = 'images/fallback.png'; // Ensure fallback image exists
            img.alt = 'Image not available';
        });
    });

    // Handle newsletter form submission
    const newsletterForm = document.querySelector('.newsletter form');
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        try {
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (response.ok) {
                alert('Subscribed successfully!');
                newsletterForm.reset();
            } else {
                alert('Subscription failed. Please try again.');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    // Placeholder for order button functionality (to be expanded)
    document.querySelectorAll('.orderNow button').forEach(button => {
        button.addEventListener('click', () => {
            alert(`Ordering ${button.closest('.box').querySelector('h3').textContent}. (Feature to be implemented)`);
        });
    });
});