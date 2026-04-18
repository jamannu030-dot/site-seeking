import re
import os

file_path = r'c:\Users\hp\OneDrive\Desktop\Site seeking (2)\Site seeking\places.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the temples block to exclude it
temples_match = re.search(r'temples:\s*\[(.*?)\]', content, re.DOTALL)
jain_match = re.search(r'jain_temples:\s*\[(.*?)\]', content, re.DOTALL)

rest = content
if temples_match:
    rest = rest.replace(temples_match.group(1), ' [TEMPLE_BLOCK_EXCLUDED] ')
if jain_match:
    rest = rest.replace(jain_match.group(1), ' [JAIN_TEMPLE_BLOCK_EXCLUDED] ')

# Find all items remaining
items = re.findall(r'(\w+):\s*\[(.*?)\]', rest, re.DOTALL)
misplaced = []

for cat, array_content in items:
    if cat in ['temples', 'jain_temples']: continue
    
    # Extract individual objects from array_content
    objs = []
    current_obj = []
    brace_count = 0
    in_item = False
    
    for line in array_content.splitlines(True):
        if '{' in line:
            in_item = True
            brace_count += line.count('{')
        if in_item:
            current_obj.append(line)
        if '}' in line:
            brace_count -= line.count('}')
            if brace_count <= 0:
                objs.append(''.join(current_obj).strip().rstrip(','))
                current_obj = []
                in_item = False
                brace_count = 0
    
    for obj in objs:
        name_match = re.search(r'name:\s*["\'](.*?)["\']', obj)
        if name_match:
            name = name_match.group(1)
            if 'Temple' in name:
                misplaced.append((name, cat, obj))

if misplaced:
    for name, cat, obj in misplaced:
        print(f"FOUND: {name} in category: {cat}")
else:
    print("No misplaced temples found.")
