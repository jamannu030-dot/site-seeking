import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make corners zero for formal look, EXCEPT for circles like .btn-icon, switch-handle, avatar
css = re.sub(r'border-radius:\s*(?!50%|30px|100%)[^;]+;', 'border-radius: 0;', css)

# Update font families
css = re.sub(r"font-family:\s*'Outfit', sans-serif;", "font-family: 'Playfair Display', serif;", css)
css = re.sub(r"font-family:\s*'Inter', sans-serif;", "font-family: 'Montserrat', sans-serif;", css)

# Add custom animations to elements to make dynamic like Digital Gravity
# Let's add a continuous background animation
anim = """
/* Digital Gravity Continuous Animated Background */
.dynamic-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -100;
    background: #010A1C;
    overflow: hidden;
}

.glow-orb {
    position: absolute;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(80px);
    animation: floatOrb 20s infinite alternate ease-in-out;
}

.glow-orb:nth-child(2) {
    background: radial-gradient(circle, rgba(0,85,255,0.15) 0%, transparent 70%);
    animation-delay: -10s;
    width: 1000px;
    height: 1000px;
    right: -200px;
    top: 20%;
}

@keyframes floatOrb {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(150px, -100px) scale(1.2); }
    100% { transform: translate(-100px, 150px) scale(0.8); }
}
"""

if "Digital Gravity Continuous Animated Background" not in css:
    css += anim

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("styles.css updated successfully")
