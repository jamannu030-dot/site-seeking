import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace transition times to 0.3s
css = re.sub(r'transition:\s*all\s*0\.[4-9]s', 'transition: all 0.3s', css)
css = re.sub(r'transition:\s*transform\s*0\.[4-9]s', 'transition: transform 0.3s', css)
css = re.sub(r'transition:\s*background\s*0\.[4-9]s', 'transition: background 0.3s', css)
css = re.sub(r'transition:\s*color\s*0\.[4-9]s', 'transition: color 0.3s', css)
css = re.sub(r'transition(.*?)\s*0\.[4-9]s', r'transition\1 0.3s', css)

# Fix complex transitions:
css = re.sub(r'0\.8s', '0.3s', css)
css = re.sub(r'0\.6s', '0.3s', css)
css = re.sub(r'0\.5s', '0.3s', css)
css = re.sub(r'0\.4s', '0.3s', css)

# Add keyframe animations to explore elements
explore_anim = """
.explore-hero, .categories-grid .card, .place {
    animation: fadeInSlideUp 0.3s ease-out forwards;
}

@keyframes fadeInSlideUp {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
"""

if "fadeInSlideUp" not in css:
    css += explore_anim

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Updated transitions to 0.3s")
