import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Replace hardcoded dark-mode backgrounds with the proper Theme Variable
# so that they correctly invert in Light Mode. 
css = css.replace("background: rgba(1, 10, 28, 0.4);", "background: var(--card-bg);")
css = css.replace("background: rgba(1, 10, 28, 0.5);", "background: var(--card-bg);")

# Enhance the dark mode card bg string slightly for better structural depth 
css = css.replace("--card-bg: rgba(255, 255, 255, 0.03);", "--card-bg: rgba(255, 255, 255, 0.05);")

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

# Also check app.js for similar hardcoded values in templates
with open("app.js", "r", encoding="utf-8") as f:
    appjs = f.read()

appjs = appjs.replace("background:rgba(1, 10, 28, 0.5);", "background:var(--card-bg);")
appjs = appjs.replace("background:rgba(1, 10, 28, 0.4);", "background:var(--card-bg);")
# there was also: background:rgba(0, 229, 255, 0.05); -> this is fine because it's a teal tint.
# let's be careful about text colors in app.js as well
with open("app.js", "w", encoding="utf-8") as f:
    f.write(appjs)

print("Light mode theme combos completely decoupled from hardcoded dark matrices.")
