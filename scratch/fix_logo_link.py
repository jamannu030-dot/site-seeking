import os
import glob

html_files = glob.glob('*.html')
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if '<div class="logo-area">' in content:
        # Update the logo area to be a functional home link
        new_content = content.replace(
            '<div class="logo-area">',
            '<div class="logo-area" style="cursor: pointer;" onclick="window.location.href=\'index.html\'" title="Go to Home">'
        )
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

# Check admin directory as well
admin_html_files = glob.glob('admin/*.html')
for file_path in admin_html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if '<div class="logo-area">' in content:
        new_content = content.replace(
            '<div class="logo-area">',
            '<div class="logo-area" style="cursor: pointer;" onclick="window.location.href=\'../index.html\'" title="Go to Home">'
        )
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

print("Done updating logo links.")
