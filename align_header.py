import os
import glob

# Files to process
html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to wrap the inside of <header> with <div class="header-inner">
    # Looking for <header> ... </header>
    if '<div class="header-inner">' not in content:
        # replace <header> with <header><div class="header-inner">
        # wait, some files might have attributes on header, though we know it's just <header>
        content = content.replace('<header>', '<header>\n    <div class="header-inner">')
        content = content.replace('</header>', '    </div>\n</header>')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

# Update styles.css
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# I want to modify the header CSS rule
# find header { ... } block
# replace display: flex; justify... from header into .header-inner
header_inner_css = """
/* Responsive Top Navigation Boundary */
.header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 5%;
}
"""

if '.header-inner {' not in css:
    css = css.replace("header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 15px 50px;", 
                      "header {\n    width: 100%;\n    padding: 15px 0;\n" + header_inner_css)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Header aligned via inner container logic")
