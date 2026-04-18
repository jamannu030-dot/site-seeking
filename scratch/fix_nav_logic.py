import os
import glob
import re

html_files = glob.glob('**/*.html', recursive=True)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Remove the onclick from logo-area
    content = content.replace('<div class="logo-area" style="cursor: pointer;" onclick="window.location.href=\'index.html\'" title="Go to Home">', '<div class="logo-area">')
    content = content.replace('<div class="logo-area" style="cursor: pointer;" onclick="window.location.href=\'../index.html\'" title="Go to Home">', '<div class="logo-area">')

    # 2. Make the h1 text a proper link
    # We will look for common h1 Site Seeking variants and wrap the text in an <a> tag
    
    # Check if we're in admin to adjust relative path
    link = '../index.html' if 'admin' in file_path.replace('\\', '/') else 'index.html'
    
    # If the text is already wrapped in an 'a' tag, don't double wrap it.
    if '<a href="' not in content.split('<div class="logo-area">')[-1].split('</h1>')[0]:
        # Replace occurrences inside the logo-area
        # A simple regex to find the h1 inside logo-area
        pattern = r'(<div class="logo-area">\s*<h1[^>]*>)(Site Seeking|SITE SEEKING)(</h1>)'
        
        def replace_func(match):
            prefix = match.group(1)
            text = match.group(2)
            suffix = match.group(3)
            return f'{prefix}<a href="{link}" style="text-decoration: none; color: inherit;">{text}</a>{suffix}'

        content = re.sub(pattern, replace_func, content, flags=re.IGNORECASE)
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed navigation logic in {file_path}")

print("Done fixing navigation logic.")
