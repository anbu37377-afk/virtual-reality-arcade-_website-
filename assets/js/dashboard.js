/* =========================================
   DASHBOARD JS
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

    const sidebar = document.querySelector('.sidebar');
    const toggler = document.querySelector('.sidebar-toggler');
    if (!sidebar) return;

    const overlay = document.createElement('div');
    overlay.className = 'dashboard-overlay';
    document.body.appendChild(overlay);

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('dashboard-sidebar-open');
    }

    function toggleSidebar() {
        const willOpen = !sidebar.classList.contains('active');
        sidebar.classList.toggle('active', willOpen);
        overlay.classList.toggle('active', willOpen);
        document.body.classList.toggle('dashboard-sidebar-open', willOpen);
    }

    if (toggler) {
        toggler.addEventListener('click', toggleSidebar);
    }

    // Close when clicking overlay
    overlay.addEventListener('click', closeSidebar);

    // Close when clicking a link (on mobile)
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                closeSidebar();
            }
        });
    });

    // Ensure sidebar state is reset when screen size changes
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) {
            closeSidebar();
        }
    });

    if (window.innerWidth < 992) {
        closeSidebar();
    }

    // Active Link Highlight
    const currentPath = window.location.pathname.split('/').pop();
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});
