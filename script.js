document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.body;

    // Check for saved theme preference or OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = hamburger.querySelector('span');
        if (mobileMenu.classList.contains('active')) {
            icon.textContent = 'close';
        } else {
            icon.textContent = 'menu';
        }
    });

    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.querySelector('span').textContent = 'menu';
        });
    });

    // 3. Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.textContent.toLowerCase();

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category').toLowerCase();
                
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s';
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending... <span class="material-symbols-outlined">hourglass_empty</span>';
            btn.style.opacity = '0.7';
            
            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <span class="material-symbols-outlined">check_circle</span>';
                btn.style.backgroundColor = '#10b981'; // Success green
                btn.style.opacity = '1';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
});
