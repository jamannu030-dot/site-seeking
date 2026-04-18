import re
import os

file_path = r'c:\Users\hp\OneDrive\Desktop\Site seeking (2)\Site seeking\places.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all categories
cats = re.findall(r'(\w+): \[', content)
misplaced = []

for cat in cats:
    cat_match = re.search(rf'{cat}: \[(.*?)\]', content, re.DOTALL)
    if cat_match:
        # Extract individual objects
        array_content = cat_match.group(1)
        items = []
        current_item = []
        brace_count = 0
        in_item = False
        
        for line in array_content.splitlines(True):
            if '{' in line:
                in_item = True
                brace_count += line.count('{')
            if in_item:
                current_item.append(line)
            if '}' in line:
                brace_count -= line.count('}')
                if brace_count <= 0:
                    items.append(''.join(current_item).strip().rstrip(','))
                    current_item = []
                    in_item = False
                    brace_count = 0
        
        for item in items:
            name_match = re.search(r'name:\s*["\'](.*?)["\']', item)
            if name_match:
                name = name_match.group(1)
                # Keywords for temples
                keywords = ['Temple', 'Mandir', 'Mahadev', 'Hanuman', 'Ganesh', 'Stepwell', 'Kund']
                if any(word.lower() in name.lower() for word in keywords):
                    if cat not in ['temples', 'jain_temples', 'forgotten']:
                        misplaced.append((name, cat, item))

if misplaced:
    for name, cat, item in misplaced:
        print(f"MISPLACED: {name} in {cat}")
else:
    print("No misplaced temples found.")
