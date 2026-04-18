import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Change logo-area to row instead of column for better horizontal alignment with the new 3D box
css = css.replace('flex-direction: column;', 'flex-direction: row; align-items: center; gap: 20px;')

# Ensure H1 has no bottom margin
css = re.sub(r'header h1 \{([^}]+)\}', r'header h1 {\1 margin: 0; }', css)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Alignment fixed")
