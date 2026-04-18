import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Let's cleanly replace the logo-area definition
logo_area_regex = re.compile(r'\.logo-area\s*\{[^}]+\}', re.MULTILINE)
css = logo_area_regex.sub('.logo-area {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 30px;\n}', css)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Proper alignment")
