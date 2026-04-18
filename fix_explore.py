import re

# 1. Update app.js to strip rounded borders and clean up inline styles to match Digital Gravity Aesthetic
with open("app.js", "r", encoding="utf-8") as f:
    appjs = f.read()

appjs = appjs.replace(
    '''<span class="distance-tag" id="dist-${mapId}" style="background:var(--accent-blue); color:white; padding:2px 10px; border-radius:12px; font-size:0.75rem; margin-left:10px; display:flex; align-items:center; gap:4px;">''',
    '''<span class="distance-tag" id="dist-${mapId}" style="background:transparent; border: 1px solid var(--accent-teal); color:var(--accent-teal); padding:3px 10px; border-radius:0; font-size:0.75rem; margin-left:10px; display:flex; align-items:center; gap:4px;">'''
)
appjs = appjs.replace(
    '''<div class="place-meta" style="display:flex; flex-wrap:wrap; gap:15px; margin-top:20px; padding:15px; background:rgba(37,99,235,0.05); border-radius:12px; border:1px solid rgba(37,99,235,0.1);">''',
    '''<div class="place-meta" style="display:flex; flex-wrap:wrap; gap:15px; margin-top:20px; padding:15px; background:rgba(0, 229, 255, 0.05); border-radius:0; border:1px solid rgba(0, 229, 255, 0.2);">'''
)
appjs = appjs.replace(
    '''<div class="manual-calc" style="margin-top:15px; display:flex; gap:10px; background:var(--bg-secondary); padding:10px; border-radius:10px;">''',
    '''<div class="manual-calc" style="margin-top:20px; display:flex; gap:10px; background:rgba(1, 10, 28, 0.5); padding:10px; border-radius:0; border: 1px solid var(--glass-border);">'''
)
appjs = appjs.replace(
    '''style="background:var(--accent-blue); color:white; border:none; padding:5px 12px; border-radius:6px; cursor:pointer; font-size:0.8rem; font-weight:600;"''',
    '''class="btn-primary" style="padding: 8px 15px; font-size: 0.85rem;"'''
)
with open("app.js", "w", encoding="utf-8") as f:
    f.write(appjs)


# 2. Append Explore Grid Design to styles.css
explore_css = """
/* --- Explore Results Grid Engine --- */
#results {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
    gap: 40px;
    width: 100%;
    margin-top: 40px;
    align-items: start;
}

@media (max-width: 1024px) {
    #results {
        grid-template-columns: 1fr;
    }
}

.place {
    background: rgba(1, 10, 28, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    padding: 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
}

.place::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--accent-gradient);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.place:hover {
    border-color: rgba(0, 229, 255, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 229, 255, 0.05);
}

.place:hover::before {
    opacity: 1;
}

.place-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-bottom: 20px;
    margin-bottom: 10px;
}

.place-header h3 {
    font-size: 1.8rem;
    color: var(--text-primary);
    margin-bottom: 5px;
}

.place-actions {
    display: flex;
    gap: 10px;
}

.place-meta .meta-item {
    font-family: 'Montserrat', sans-serif;
    color: var(--text-primary) !important; 
    font-size: 0.95rem;
}
.place-meta .meta-item i {
    color: var(--accent-teal);
    font-size: 1.2rem;
}

.place p {
    color: var(--text-secondary);
    line-height: 1.8;
    font-size: 1.05rem;
}
"""

with open("styles.css", "a", encoding="utf-8") as f:
    f.write("\n" + explore_css + "\n")

# 3. Add max-width wrapper around explore main content just to be sure it aligns to window view natively
with open("explore.html", "r", encoding="utf-8") as f:
    explore_html = f.read()

# Replace <main class="dashboard-container" ...> or find the categories section and wrap safely
if "max-width: 1400px;" not in explore_html:
    explore_html = explore_html.replace(
        '<section id="categories"',
        '<div style="max-width: 1400px; margin: 0 auto; padding: 0 5%; width: 100%;">\n    <section id="categories"'
    )
    explore_html = explore_html.replace(
        '</section>\n\n    <!-- Hidden Itinerary Form -->',
        '</section>\n    </div>\n\n    <!-- Hidden Itinerary Form -->'
    )

with open("explore.html", "w", encoding="utf-8") as f:
    f.write(explore_html)

print("Explore aesthetic fully rebuilt securely.")
