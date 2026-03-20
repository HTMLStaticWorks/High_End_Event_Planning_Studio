const fs = require('fs');
const path = require('path');

const favicon_tag = '    <link rel="icon" type="image/svg+xml" href="../assets/images/favicon.svg">\n</head>';

const cta_html = `    <!-- CTA Section -->
    <section class="cta-section text-center bg-dark fade-in" style="padding: var(--space-12) 0 var(--space-6) 0;">
        <div class="container fade-up" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: var(--space-10);">
            <h2 style="font-size: 4rem; color: var(--color-champagne); margin-bottom: var(--space-4);">Ready to create?</h2>
            <a href="contact.html" class="btn btn--outline" style="border-color: var(--color-champagne); color: var(--color-champagne);">Submit Inquiry</a>
        </div>
    </section>\n\n`;

const footer_html = `    <!-- Footer -->
    <footer class="site-footer fade-in">
        <div class="container">
            <div class="footer-grid">
                <!-- Left Column -->
                <div class="footer-col brand-col">
                    <h3 style="font-size:2rem; color:var(--color-white); margin-bottom:var(--space-2); font-family: var(--font-heading);">Lumière</h3>
                    <p style="color: #888; margin-bottom: var(--space-3); line-height: 1.6;">A high-end styling and planning studio dedicated to creating deeply personal, aesthetically uncompromised events worldwide.</p>
                    <div class="social-links" style="display: flex; gap: 1.5rem; margin-top: var(--space-2);">
                        <a href="#" aria-label="Instagram" style="color: var(--color-white); opacity: 0.8; transition: all 0.3s; display: block;" onmouseover="this.style.color='var(--color-champagne)'; this.style.opacity='1'; this.style.transform='translateY(-2px)'" onmouseout="this.style.color='var(--color-white)'; this.style.opacity='0.8'; this.style.transform='translateY(0)'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="#" aria-label="Pinterest" style="color: var(--color-white); opacity: 0.8; transition: all 0.3s; display: block;" onmouseover="this.style.color='var(--color-champagne)'; this.style.opacity='1'; this.style.transform='translateY(-2px)'" onmouseout="this.style.color='var(--color-white)'; this.style.opacity='0.8'; this.style.transform='translateY(0)'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><line x1="12" y1="12" x2="12" y2="22"></line><line x1="12" y1="12" x2="16" y2="7"></line><line x1="12" y1="12" x2="8" y2="7"></line><path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"></path></svg>
                        </a>
                        <a href="#" aria-label="Facebook" style="color: var(--color-white); opacity: 0.8; transition: all 0.3s; display: block;" onmouseover="this.style.color='var(--color-champagne)'; this.style.opacity='1'; this.style.transform='translateY(-2px)'" onmouseout="this.style.color='var(--color-white)'; this.style.opacity='0.8'; this.style.transform='translateY(0)'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                    </div>
                </div>

                <!-- Middle Column -->
                <div class="footer-col nav-col">
                    <h4>Studio</h4>
                    <ul>
                        <li><a href="about.html">About us</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="portfolio.html">Portfolio</a></li>
                        <li><a href="blog.html">Journal</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>

                <!-- Right Column -->
                <div class="footer-col newsletter-col">
                    <h4>Newsletter</h4>
                    <p style="margin-bottom:var(--space-3); font-size:0.875rem; color:#888;">Join our list for studio news and inspiration.</p>
                    <form class="newsletter-form" style="display:flex; align-items: center; border-bottom:1px solid rgba(255,255,255,0.3); padding-bottom: 0.5rem; transition: border-color 0.3s;" onmouseover="this.style.borderColor='rgba(255,255,255,0.7)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.3)'">
                        <input type="email" placeholder="Email Address" style="background:transparent; border:none; color:#fff; outline:none; font-family:var(--font-body); width:100%; font-size: 1rem;">
                        <button type="submit" style="background:transparent; border:none; color:var(--color-champagne); cursor:pointer; text-transform:uppercase; letter-spacing:0.1em; font-size:0.75rem; white-space:nowrap; padding-left: 1rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--color-champagne)'">Subscribe</button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Lumière Studio. All Rights Reserved. Designed with elegance.</p>
            </div>
        </div>
    </footer>`;

const pages_dir = "c:\\slot 4\\High-End Event Planning & Styling Studio\\lumiere-studio\\pages";
const all_files = [
    "index.html", "home-2.html", "about.html", "services.html",
    "portfolio.html", "blog.html", "contact.html", "login.html", "register.html", "dashboard.html"
];

const footer_files = [
    "index.html", "home-2.html", "about.html", "services.html",
    "portfolio.html", "blog.html", "contact.html"
];

for (const f of all_files) {
    const p = path.join(pages_dir, f);
    if (!fs.existsSync(p)) continue;
    
    let content = fs.readFileSync(p, 'utf-8');
    
    if (!content.includes('favicon.svg')) {
        content = content.replace(/<\/head>/i, favicon_tag);
    }
    
    if (footer_files.includes(f)) {
        const replacement = f === 'home-2.html' ? cta_html + footer_html : footer_html;
        
        let newContent = content.replace(/<!--[^>]*Footer[^>]*-->\s*<footer[\s\S]*?<\/footer>/gi, replacement);
        if (newContent === content) {
            newContent = content.replace(/<footer[\s\S]*?<\/footer>/gi, replacement);
        }
        content = newContent;
    }
    
    fs.writeFileSync(p, content, 'utf-8');
}
console.log('Done JS');
