import re

# 1. Clean styles.css
with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Pattern to remove custom cursor logic block
# Matches from /* 2. Custom AR/Motion Cursor */ to before /* 3. Real-Time Pseudo 3D Tilt Card Environment */
css = re.sub(r'/\* 2\. Custom AR/Motion Cursor \*/.*?/\* 3\. Real-Time Pseudo 3D Tilt Card Environment \*/', '/* 3. Real-Time Pseudo 3D Tilt Card Environment */', css, flags=re.DOTALL)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

# 2. Fix dashboard.html broken HTML in header
with open("dashboard.html", "r", encoding="utf-8") as f:
    html = f.read()

bad_nav = """        <nav>
            <a href="index.html">Home</a>
            <a href="explore.html">Explore</a>
            <a href="dashboard.html">Dashboard</a>
        <!-- removed Sign In -->
        <a href="contact.html">Contact</a>

            </div>
        </div>
        </nav>"""

good_nav = """        <nav>
            <a href="index.html">Home</a>
            <a href="explore.html">Explore</a>
            <a href="dashboard.html">Dashboard</a>
            <a href="contact.html">Contact</a>
        </nav>"""

html = html.replace(bad_nav, good_nav)

with open("dashboard.html", "w", encoding="utf-8") as f:
    f.write(html)


# 3. Same fix for reviews.html just in case
with open("reviews.html", "r", encoding="utf-8") as f:
    html_rev = f.read()

html_rev = html_rev.replace(bad_nav, good_nav)

with open("reviews.html", "w", encoding="utf-8") as f:
    f.write(html_rev)

print("Dashboard HTML and styles fixed")
