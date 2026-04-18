import urllib.request
import json
import re

places = {
    "Hawa Mahal": "Hawa_Mahal",
    "Amer Fort": "Amer_Fort",
    "City Palace": "City_Palace,_Jaipur",
    "Jal Mahal": "Jal_Mahal",
    "Panna Meena Kund": "Panna_Meena_ka_Kund",
    "Albert Hall": "Albert_Hall_Museum"
}

image_urls = {}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SiteSeeking/1.0'}

for name, title in places.items():
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=pageimages&format=json&pithumbsize=800"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            pages = data['query']['pages']
            page = list(pages.values())[0]
            if 'thumbnail' in page:
                image_urls[name] = page['thumbnail']['source']
                print(f"Found {name}: {image_urls[name]}")
            else:
                print(f"No thumbnail for {name}")
    except Exception as e:
        print(f"Error for {name}: {e}")

# Now update index.html
if len(image_urls) > 0:
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "Hawa Mahal" in image_urls:
        content = re.sub(r'src="[^"]+" alt="Hawa Mahal"', f'src="{image_urls["Hawa Mahal"]}" alt="Hawa Mahal"', content)
    if "Amer Fort" in image_urls:
         content = re.sub(r'src="[^"]+" alt="Amer Fort"', f'src="{image_urls["Amer Fort"]}" alt="Amer Fort"', content)
    if "City Palace" in image_urls:
         content = re.sub(r'src="[^"]+" alt="City Palace"', f'src="{image_urls["City Palace"]}" alt="City Palace"', content)
    if "Jal Mahal" in image_urls:
         content = re.sub(r'src="[^"]+" alt="Jal Mahal"', f'src="{image_urls["Jal Mahal"]}" alt="Jal Mahal"', content)
    if "Panna Meena Kund" in image_urls:
         content = re.sub(r'src="[^"]+" alt="Stepwell"', f'src="{image_urls["Panna Meena Kund"]}" alt="Stepwell"', content)
    if "Albert Hall" in image_urls:
         content = re.sub(r'src="[^"]+" alt="Albert Hall"', f'src="{image_urls["Albert Hall"]}" alt="Albert Hall"', content)
         
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully replaced image URLs in index.html with real Jaipur landmarks.")
