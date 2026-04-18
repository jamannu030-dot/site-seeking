import os

# 1. Add global dynamic-canvas to dashboard.html, explore.html, and reviews.html
def add_dynamic_canvas(filename):
    with open(filename, "r", encoding="utf-8") as f:
        html = f.read()

    canvas = """<!-- Dynamic Background -->
<div class="dynamic-canvas">
    <div class="glow-orb"></div>
    <div class="glow-orb"></div>
</div>"""

    # Add after <body> if not present
    if '<div class="dynamic-canvas">' not in html:
        html = html.replace('<body>', f'<body>\n{canvas}')
        with open(filename, "w", encoding="utf-8") as f:
            f.write(html)

for file in ["explore.html", "dashboard.html", "reviews.html", "settings.html", "itinerary.html", "saved-places.html"]:
    if os.path.exists(file):
        add_dynamic_canvas(file)

# 2. Update admin/index.html mapped to Digital Gravity
admin_html_path = os.path.join('admin', 'index.html')
if os.path.exists(admin_html_path):
    with open(admin_html_path, "r", encoding="utf-8") as f:
        admin_html = f.read()

    # Redefine the tailwind config object
    old_tailwind = """        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#4f46e5',
                        dark: '#0f172a',
                        darkPanel: '#1e293b'
                    }
                }
            }
        }"""
    
    new_tailwind = """        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#00E5FF',     /* accent-teal */
                        dark: '#010A1C',        /* bg-main */
                        darkPanel: '#000511'    /* bg-darker */
                    },
                    fontFamily: {
                        sans: ['Montserrat', 'sans-serif'],
                        serif: ['Playfair Display', 'serif']
                    }
                }
            }
        }"""
    
    admin_html = admin_html.replace(old_tailwind, new_tailwind)
    
    # Inject animations.js and override styles
    if '<script src="../animations.js"' not in admin_html:
        admin_html = admin_html.replace('</body>', '    <script src="../animations.js" defer></script>\n</body>')
    
    # Replace any text-gray-800 with crisp white text logically
    admin_html = admin_html.replace('text-gray-800', 'text-white')
    admin_html = admin_html.replace('bg-white', 'bg-black/20 backdrop-blur-md border border-white/10')
    admin_html = admin_html.replace('bg-gray-50', 'bg-dark')
    
    with open(admin_html_path, "w", encoding="utf-8") as f:
        f.write(admin_html)

# 3. Repeat for admin/login.html
admin_login = os.path.join('admin', 'login.html')
if os.path.exists(admin_login):
    with open(admin_login, "r", encoding="utf-8") as f:
        admin_log = f.read()
    admin_log = admin_log.replace(old_tailwind, new_tailwind)
    if '<script src="../animations.js"' not in admin_log:
        admin_log = admin_log.replace('</body>', '    <script src="../animations.js" defer></script>\n</body>')
    with open(admin_login, "w", encoding="utf-8") as f:
        f.write(admin_log)

print("Synchronized all structural aesthetics into explore, dashboard and the admin framework effortlessly.")
