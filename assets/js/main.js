/* =========================================
   MAIN JS - Common Functionality
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

    // 1. Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    const htmlElement = document.documentElement;

    // Check localStorage
    let savedTheme = 'dark';
    try {
        savedTheme = localStorage.getItem('theme') || 'dark';
    } catch (e) {
        console.warn('LocalStorage access denied or failed', e);
    }

    if (htmlElement) {
        htmlElement.setAttribute('data-bs-theme', savedTheme);
    }

    // Function to update interaction icons
    function updateIcons(theme) {
        // Find all theme toggle icons (desktop and mobile)
        const icons = document.querySelectorAll('#theme-toggle i, #theme-toggle-mobile i');

        icons.forEach(img => {
            if (theme === 'dark') {
                img.classList.remove('bi-moon-fill');
                img.classList.add('bi-sun-fill');
            } else {
                img.classList.remove('bi-sun-fill');
                img.classList.add('bi-moon-fill');
            }
        });
    }

    // Initial update
    updateIcons(savedTheme);

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-bs-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            // Ignore
        }
        updateIcons(newTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    if (themeToggleBtnMobile) {
        themeToggleBtnMobile.addEventListener('click', toggleTheme);
    }

    // 2. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                if (backToTopBtn.classList) backToTopBtn.classList.add('show');
            } else {
                if (backToTopBtn.classList) backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Update Copyright Year automatically
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = "2026";
    }

    // 4. Initialize Tooltips (Bootstrap 5)
    // Verify Bootstrap exists before using it, though usually we assume it's loaded.
    // Also document.querySelectorAll returns a NodeList, so checking length or slicing is handled.
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // 5. Scroll Animations (Automatic Observer)
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target) {
                    if (entry.target.classList) {
                        entry.target.classList.add('active');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedSelectors = [
            '.hero-title',
            '.lead',
            '.card',
            'h2',
            'h3',
            '.img-fluid',
            '.btn-lg',
            '.list-group-item'
        ];

        const elementsToAnimate = document.querySelectorAll(animatedSelectors.join(','));

        elementsToAnimate.forEach((el, index) => {
            if (el && el.classList) {
                el.classList.add('reveal');
                // Add staggered delays
                if (el.classList.contains('card')) {
                    const delayClass = `reveal-delay-${(index % 3 + 1) * 100}`;
                    el.classList.add(delayClass);
                }
                observer.observe(el);
            }
        });

        // Also observe manually added .reveal elements that might not be in the list above
        document.querySelectorAll('.reveal').forEach(el => {
            if (el) observer.observe(el);
        });
    }
});

