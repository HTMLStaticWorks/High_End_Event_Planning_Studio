import os
import re

favicon_tag = '    <link rel="icon" type="image/svg+xml" href="../assets/images/favicon.svg">\n</head>'

cta_html = """    <!-- CTA Section -->
    <section class="cta-section text-center bg-dark fade-in" style="padding: var(--space-12) 0 var(--space-6) 0;">
        <div class="container fade-up" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: var(--space-10);">
            <h2 style="font-size: 4rem; color: var(--color-champagne); margin-bottom: var(--space-4);">Ready to create?</h2>
            <a href="contact.html" class="btn btn--outline" style="border-color: var(--color-champagne); color: var(--color-champagne);">Submit Inquiry</a>
        </div>
    </section>

"""

footer_html = """    <!-- Footer -->
    <footer class="site-footer fade-in">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col" style="grid-column: span 2;">
                    <h3 style="font-size:2rem; color:var(--color-white); margin-bottom:var(--space-2); font-family: var(--font-heading);">Solenza</h3>
                    <p style="max-width:300px; color: #888;">A luxury event curation and planning studio dedicated to creating deeply personal, aesthetically uncompromised events worldwide.</p>
                </div>
                <div class="footer-col">
                    <h4>Studio</h4>
                    <ul>
                        <li><a href="about.html">About us</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="portfolio.html">Portfolio</a></li>
                        <li><a href="blog.html">Journal</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-col" style="grid-column: span 1;">
                    <h4>Connect</h4>
                    <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                        <a href="#" aria-label="Instagram" style="color: var(--color-white); opacity: 0.7; transition: opacity 0.3s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="#" aria-label="Pinterest" style="color: var(--color-white); opacity: 0.7; transition: opacity 0.3s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="12" x2="12" y2="22"></line><line x1="12" y1="12" x2="16" y2="7"></line><line x1="12" y1="12" x2="8" y2="7"></line><path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"></path></svg>
                        </a>
                        <a href="#" aria-label="Facebook" style="color: var(--color-white); opacity: 0.7; transition: opacity 0.3s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                    </div>
                </div>
                <div class="footer-col" style="grid-column: span 1;">
                    <h4>Newsletter</h4>
                    <p style="margin-bottom:var(--space-2); font-size:0.875rem; color:#888;">Join our list for studio news and inspiration.</p>
                    <form style="display:flex; border-bottom:1px solid rgba(255,255,255,0.3); padding-bottom: 0.5rem;">
                        <input type="email" placeholder="Email Address" style="background:transparent; border:none; color:#fff; outline:none; font-family:var(--font-body); width:100%;">
                        <button type="submit" style="background:transparent; border:none; color:var(--color-champagne); cursor:pointer; text-transform:uppercase; letter-spacing:0.1em; font-size:0.75rem;">Subscribe</button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Solenza Studio. All Rights Reserved. Designed with elegance.</p>
            </div>
        </div>
    </footer>"""

pages_dir = r"c:\slot 4\High-End Event Planning Styling Studio\pages"
all_files = [
    "index.html", "home-2.html", "about.html", "services.html",
    "portfolio.html", "blog.html", "contact.html", "login.html", "register.html", "dashboard.html"
]

footer_files = [
    "index.html", "home-2.html", "about.html", "services.html",
    "portfolio.html", "blog.html", "contact.html"
]

for f in all_files:
    path = os.path.join(pages_dir, f)
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if 'favicon.svg' not in content:
        content = re.sub(r'</head>', favicon_tag, content, flags=re.IGNORECASE)
    
    if f in footer_files:
        if f == "home-2.html":
            replacement = cta_html + footer_html
        else:
            replacement = footer_html
            
        content = re.sub(r'<!--[^>]*Footer[^>]*-->\s*<footer[\s\S]*?</footer>', replacement, content, flags=re.IGNORECASE)
        if replacement not in content:
            content = re.sub(r'<footer[\s\S]*?</footer>', replacement, content, flags=re.IGNORECASE)

    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)

print('Updated all files successfully.')
