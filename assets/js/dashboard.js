/**
 * Solenza - Dashboard Logic
 * Handles sidebar tab switching logic and interactive dashboard UI.
 */

document.addEventListener('DOMContentLoaded', () => {
    initDashboardTabs();
    initSidebarToggle();
    initCountdown();
    initProfileNavLink();
});

function getDashboardNavButtons() {
    return document.querySelectorAll('.sidebar-nav button[data-target]');
}

function getDashboardSections() {
    return document.querySelectorAll('.dash-section');
}

function activateDashboardSection(targetId, options = {}) {
    const { closeMobileSidebar = true } = options;
    const navButtons = getDashboardNavButtons();
    const sections = getDashboardSections();
    const dashboardTitle = document.getElementById('dashboardTitle');

    navButtons.forEach((b) => b.classList.remove('active'));
    sections.forEach((s) => s.classList.remove('active'));

    const btn = document.querySelector(`.sidebar-nav button[data-target="${targetId}"]`);
    const activeSection = document.getElementById(targetId);

    if (btn) btn.classList.add('active');
    if (activeSection) {
        activeSection.style.animation = 'none';
        activeSection.offsetHeight;
        activeSection.style.animation = null;
        activeSection.classList.add('active');
    }

    if (dashboardTitle && btn) {
        dashboardTitle.textContent = btn.textContent.trim();
    } else if (dashboardTitle && targetId === 'profile') {
        dashboardTitle.textContent = 'Profile';
    }

    if (closeMobileSidebar) {
        const wrapper = document.querySelector('.dashboard-wrapper');
        if (wrapper && window.innerWidth <= 768) {
            wrapper.classList.remove('sidebar-open');
        }
    }
}

function initDashboardTabs() {
    const navButtons = getDashboardNavButtons();
    const sections = getDashboardSections();

    if (!navButtons.length || !sections.length) return;

    navButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            if (!targetId) return;
            activateDashboardSection(targetId);
        });
    });
}

function initProfileNavLink() {
    const link = document.getElementById('dashboardProfileLink');
    if (!link) return;

    link.addEventListener('click', (e) => {
        e.preventDefault();
        activateDashboardSection('profile', { closeMobileSidebar: true });
        const profileSection = document.getElementById('profile');
        if (profileSection) {
            requestAnimationFrame(() => {
                profileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
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
    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMins = document.getElementById('cdMins');

    if (!cdDays || !cdHours || !cdMins) return;

    function update() {
        const now = new Date();
        const diff = target - now;

        if (diff <= 0) {
            cdDays.textContent = '00';
            cdHours.textContent = '00';
            cdMins.textContent = '00';
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        cdDays.textContent = String(d).padStart(2, '0');
        cdHours.textContent = String(h).padStart(2, '0');
        cdMins.textContent = String(m).padStart(2, '0');
    }

    update();
    setInterval(update, 60000);
}
