import urllib.request
import json
import random
import re

# Fetch from Overpass
overpass_url = "http://overpass-api.de/api/interpreter"
overpass_query = """
[out:json];
(
  node["amenity"="place_of_worship"](26.85,75.75,26.95,75.85);
);
out center;
"""
print("Fetching from Overpass API (this might take 10 seconds)...")
req = urllib.request.Request(overpass_url, data=overpass_query.encode('utf-8'))
response = urllib.request.urlopen(req)
data = json.loads(response.read().decode('utf-8'))

new_temples = []
new_mosques = []
new_gurudwaras = []
new_churches = []

images = [
    "https://images.unsplash.com/photo-1598322312687-32b005fe438f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1627915599026-c228d447f5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1604176354204-92687a419eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1548625361-2495b6c34bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
]

images_islam = [
    "https://images.unsplash.com/photo-1580462611434-39cde8c29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590050720465-b3e3af72eb0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
]

for element in data['elements']:
    tags = element.get('tags', {})
    name = tags.get('name', '')
    if not name:
        continue
    
    # We replace quotes to avoid breaking JS
    name_clean = name.replace('"', '').replace("'", "")
    history_text = "Mapped natively through live OpenStreetMap regional data mapping for Jaipur district."
    
    religion = tags.get('religion', '').lower()
    
    item = {
        "name": name_clean,
        "image": random.choice(images),
        "history": history_text,
        "map": ""
    }
    
    if religion == 'hindu':
        new_temples.append(item)
    elif religion == 'muslim':
        item["image"] = random.choice(images_islam)
        new_mosques.append(item)
    elif religion == 'sikh':
        new_gurudwaras.append(item)
    elif religion == 'christian':
        new_churches.append(item)
    else:
        name_lower = name_clean.lower()
        if 'temple' in name_lower or 'mandir' in name_lower or 'mahadev' in name_lower or 'balaji' in name_lower:
            new_temples.append(item)
        elif 'masjid' in name_lower or 'mosque' in name_lower:
            item["image"] = random.choice(images_islam)
            new_mosques.append(item)
        elif 'church' in name_lower:
            new_churches.append(item)
        elif 'gurudwara' in name_lower:
            new_gurudwaras.append(item)


print(f"Extracted API data: {len(new_temples)} temples, {len(new_mosques)} mosques.")

# Append to places.js safely using regex
import os
file_path = r'c:\Users\hp\OneDrive\Desktop\Site seeking\places.js'

with open(file_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Collect names to avoid duplicates
existing_names = re.findall(r'name:\s*"([^"]+)"', js_content)
existing_names = set(n.lower() for n in existing_names)

def get_unique(items):
    res = []
    for item in items:
        if item['name'].lower() not in existing_names:
            res.append(item)
            existing_names.add(item['name'].lower())
    return res

new_temples = get_unique(new_temples)
new_mosques = get_unique(new_mosques)
new_gurudwaras = get_unique(new_gurudwaras)
new_churches = get_unique(new_churches)

print(f"Will append uniquely: {len(new_temples)} temples, {len(new_mosques)} mosques, {len(new_gurudwaras)} gurdwaras, {len(new_churches)} churches.")

def format_item(item):
    return f'''        {{
            name: "{item['name']}",
            image: "{item['image']}",
            history: "{item['history']}",
            map: ""
        }}'''

# Inject into temples
if new_temples:
    temples_injection = ',\n' + ',\n'.join([format_item(i) for i in new_temples]) + '\n    ],\n\n    mosques'
    js_content = re.sub(r'\n    \],\s+mosques', temples_injection, js_content)

# Inject into mosques
if new_mosques:
    mosques_injection = ',\n' + ',\n'.join([format_item(i) for i in new_mosques]) + '\n    ],\n\n    gurudwaras'
    js_content = re.sub(r'\n    \],\s+gurudwaras', mosques_injection, js_content)

# Inject into gurudwaras
if new_gurudwaras:
    g_injection = ',\n' + ',\n'.join([format_item(i) for i in new_gurudwaras]) + '\n    ],\n\n    churches'
    js_content = re.sub(r'\n    \],\s+churches', g_injection, js_content)

# Inject into churches
if new_churches:
    c_injection = ',\n' + ',\n'.join([format_item(i) for i in new_churches]) + '\n    ]\n};'
    js_content = re.sub(r'\n    \]\n};', c_injection, js_content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Massively expanded places.js successfully!")
