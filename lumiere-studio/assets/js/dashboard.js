/**
 * Lumière - Dashboard Logic
 * Handles sidebar tab switching logic and interactive dashboard UI.
 */

document.addEventListener('DOMContentLoaded', () => {
    initDashboardTabs();
    initSidebarToggle();
});

function initDashboardTabs() {
    const navButtons = document.querySelectorAll('.sidebar-nav button[data-target]');
    const sections = document.querySelectorAll('.dash-section');
    const dashboardTitle = document.getElementById('dashboardTitle');

    if (!navButtons.length || !sections.length) return;

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            // Remove active class from all buttons and sections
            navButtons.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            btn.classList.add('active');
            const activeSection = document.getElementById(targetId);
            if (activeSection) {
                // simple animation reset
                activeSection.style.animation = 'none';
                activeSection.offsetHeight; /* trigger reflow */
                activeSection.style.animation = null; 
                activeSection.classList.add('active');
            }

            // Update title
            if (dashboardTitle) {
                dashboardTitle.textContent = btn.textContent;
            }

            // Close sidebar on mobile after clicking a link
            const wrapper = document.querySelector('.dashboard-wrapper');
            if (wrapper && window.innerWidth <= 768) {
                wrapper.classList.remove('sidebar-open');
            }
        });
    });
}

function initSidebarToggle() {
    const toggle = document.getElementById('sidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');
    const wrapper = document.querySelector('.dashboard-wrapper');

    if (toggle && wrapper) {
        toggle.addEventListener('click', () => {
            wrapper.classList.toggle('sidebar-open');
        });
    }

    if (overlay && wrapper) {
        overlay.addEventListener('click', () => {
            wrapper.classList.remove('sidebar-open');
        });
    }
}
