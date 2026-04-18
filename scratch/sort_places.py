import re
import os

file_path = r'c:\Users\hp\OneDrive\Desktop\Site seeking (2)\Site seeking\places.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

categories = ['churches', 'forgotten', 'forts', 'gurudwaras', 'jain_temples', 'mosques', 'palaces', 'temples']

def sort_category(cat_name, text):
    # Use regular string for pattern to avoid f-string brace issues
    pattern = r'(' + re.escape(cat_name) + r':\s*\[)(.*?)(\]\s*(?:,|\s*\}\s*;))'
    m = re.search(pattern, text, re.DOTALL)
    if not m: 
        print(f"Category {cat_name} not found")
        return text
    
    prefix = m.group(1)
    array_content = m.group(2)
    suffix = m.group(3)
    
    items = []
    current_item = []
    brace_count = 0
    in_item = False
    
    for line in array_content.splitlines(True):
        if '{' in line:
            if not in_item:
                in_item = True
            brace_count += line.count('{')
        if in_item:
            current_item.append(line)
        if '}' in line:
            brace_count -= line.count('}')
            if in_item and brace_count <= 0:
                items.append(''.join(current_item).strip().rstrip(','))
                current_item = []
                in_item = False
                brace_count = 0

    def get_name(item):
        nm = re.search(r'name:\s*["\'](.*?)["\']', item)
        return nm.group(1).lower() if nm else ''
    
    items.sort(key=get_name)
    
    # Re-insert commas and formatting
    new_array_content = '\n        ' + ',\n        '.join(items) + '\n    '
    
    # We need to replace exactly the array_content part
    # Finding the start and end indices of array_content in text
    start_idx = m.start(2)
    end_idx = m.end(2)
    return text[:start_idx] + new_array_content + text[end_idx:]

new_content = content
for cat in categories:
    new_content = sort_category(cat, new_content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Sorting complete.")
