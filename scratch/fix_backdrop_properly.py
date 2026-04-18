import re

file_path = r'c:\Users\hp\OneDrive\Desktop\Site seeking (2)\Site seeking\styles.css'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the double prefix typo -webkit--webkit-
content = content.replace('-webkit--webkit-', '-webkit-')

# Remove all existing backdrop-filter and -webkit-backdrop-filter declarations
# and replace them with a standardized pair.
# We first find all unique values and then replace them.

def replace_backdrop(match):
    # The property might be -webkit-backdrop-filter or backdrop-filter
    # The value is what we care about
    full_match = match.group(0)
    # Extract the value from the last declaration if multiple, or just the one.
    # regex: (?:-webkit-)?backdrop-filter:\s*([^;]+);
    values = re.findall(r'(?:-webkit-)?backdrop-filter:\s*([^;]+);', full_match)
    if not values: return full_match
    
    val = values[-1].strip()
    return f'-webkit-backdrop-filter: {val};\n    backdrop-filter: {val};'

# This pattern looks for blocks of backdrop-filter declarations
# It matches one or more declarations in a row (possibly with whitespace)
pattern = r'((?:-webkit-)?backdrop-filter:\s*[^;]+;\s*)+'
content = re.sub(pattern, replace_backdrop, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Backdrop filter cleanup complete.")
