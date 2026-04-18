import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

old_fonts_regex = r'<link href="https://fonts\.googleapis\.com/css2\?family=Inter:.*?&family=Outfit:.*?&display=swap" rel="stylesheet">'
new_fonts = '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">'

for file in html_files:
    if file == 'index.html' or file == 'explore.html':
        continue # Already handled

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace fonts
    content = re.sub(old_fonts_regex, new_fonts, content, flags=re.DOTALL)

    # Add Explore to nav if it exists but missing explore
    # A bit tricky, let's just replace the standard nav
    nav_old_pattern = re.compile(r'<nav>\s*<a href="index.html"(?: class="active")?>Home</a>\s*<a href="dashboard.html"(?: class="active")?>Dashboard</a>', re.IGNORECASE)
    nav_replacement = r'<nav>\n            <a href="index.html">Home</a>\n            <a href="explore.html">Explore</a>\n            <a href="dashboard.html">Dashboard</a>'
    content = nav_old_pattern.sub(nav_replacement, content)

    # In contact.html and others
    nav_old_pattern2 = re.compile(r'<a href="index.html"(?: class="active")?>Home</a>\s*<a href="contact.html"(?: class="active")?>Contact</a>', re.IGNORECASE)
    nav_replace2 = r'<a href="index.html">Home</a>\n            <a href="explore.html">Explore</a>\n            <a href="contact.html">Contact</a>'
    content = nav_old_pattern2.sub(nav_replace2, content)

    # Adding background to body or somewhere global. Wait, dynamically injecting it behind body
    if 'dynamic-canvas' not in content:
        content = content.replace('<body>', '<body>\n<!-- Dynamic Background -->\n<div class="dynamic-canvas">\n    <div class="glow-orb"></div>\n    <div class="glow-orb"></div>\n</div>\n')

    # Update category links
    content = content.replace('href="index.html#categories"', 'href="explore.html#categories"')
    content = content.replace('index.html?search=', 'explore.html?search=')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("HTML files updated")
