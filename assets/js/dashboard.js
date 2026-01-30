/* =========================================
   DASHBOARD JS
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

    const sidebar = document.querySelector('.sidebar');
    const toggler = document.querySelector('.sidebar-toggler');
    const overlay = document.createElement('div');
    overlay.className = 'dashboard-overlay';
    document.body.appendChild(overlay);

    if (toggler && sidebar) {
        toggler.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }

    // Close when clicking overlay
    overlay.addEventListener('click', function () {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Close when clicking a link (on mobile)
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    // Active Link Highlight
    const currentPath = window.location.pathname.split('/').pop();
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});
