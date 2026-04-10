/**
 * Solenza - Dashboard Logic
 * Handles sidebar tab switching logic and interactive dashboard UI.
 */

document.addEventListener('DOMContentLoaded', () => {
    initDashboardTabs();
    initSidebarToggle();
    initCountdown();
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

            // Update title — trim to exclude SVG icon text nodes
            if (dashboardTitle) {
                dashboardTitle.textContent = btn.textContent.trim();
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

function initCountdown() {
    const target = new Date('2026-08-15T00:00:00');
    const cdDays  = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMins  = document.getElementById('cdMins');

    if (!cdDays || !cdHours || !cdMins) return;

    function update() {
        const now  = new Date();
        const diff = target - now;

        if (diff <= 0) {
            cdDays.textContent  = '00';
            cdHours.textContent = '00';
            cdMins.textContent  = '00';
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        cdDays.textContent  = String(d).padStart(2, '0');
        cdHours.textContent = String(h).padStart(2, '0');
        cdMins.textContent  = String(m).padStart(2, '0');
    }

    update();
    setInterval(update, 60000); // refresh every minute
}
