import os
import glob
import re

html_files = glob.glob('*.html')

# New standardized header structure
# We'll use a placeholder for navigation links to preserve active classes
header_template = '''<header>
    <div class="logo-area">
        <h1>SITE SEEKING</h1>
        <div class="theme-switch-wrapper" onclick="toggleTheme()" title="Toggle Theme">
            <div class="theme-switch">
                <i class="ph-fill ph-sun"></i>
                <i class="ph-fill ph-moon"></i>
                <div class="switch-handle"></div>
            </div>
        </div>
    </div>
    <div class="header-rightside">
        {extra_content}
        <nav>
            {nav_links}
        </nav>
    </div>
</header>'''

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Identify the current nav links
    nav_match = re.search(r'<nav>(.*?)</nav>', content, re.DOTALL)
    if not nav_match:
        continue
    nav_links = nav_match.group(1).strip()
    
    # Identify if there is a search container (only index.html usually)
    search_match = re.search(r'<div class="search-container">.*?</div>', content, re.DOTALL)
    extra_content = search_match.group(0) if search_match else ''
    
    # Identify the outer header to replace
    # Replacing everything between <header> and </header>
    full_header_pattern = re.compile(r'<header>.*?</header>', re.DOTALL)
    
    new_header = header_template.format(extra_content=extra_content, nav_links=nav_links)
    content = full_header_pattern.sub(new_header, content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated header in {file}")
