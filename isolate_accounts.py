import os
import glob
import re

# Keys to securely isolate per active user session
keys_to_isolate = [
    'siteSeeking_saved',
    'siteSeeking_itinerary',
    'siteSeeking_avatar',
    'siteSeeking_reviews'
]

replacement_map = {
    "'siteSeeking_saved'": "`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_saved`",
    '"siteSeeking_saved"': "`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_saved`",
    
    "'siteSeeking_itinerary'": "`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_itinerary`",
    '"siteSeeking_itinerary"': "`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_itinerary`",
    
    "'siteSeeking_avatar'": "`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_avatar`",
    '"siteSeeking_avatar"': "`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_avatar`",
    
    "'siteSeeking_reviews'": "`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_reviews`",
    '"siteSeeking_reviews"': "`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_reviews`"
}

all_files = glob.glob('*.html') + glob.glob('*.js')

for file in all_files:
    if file == "isolate_accounts.py": continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    for old_string, new_string in replacement_map.items():
        if old_string in content:
            content = content.replace(old_string, new_string)
            modified = True
            
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
            print(f"Isolated states in {file}")

print("Platform completely migrated to isolated user memory grids.")
