import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We need to replace the entire theme switch block from /* Theme Switch hidden or customized */ up to the end of .theme-switch:hover
# We can use regex or string methods.

start_marker = "/* Theme Switch hidden or customized */"
end_marker = ".theme-switch:hover {\n    transform: scale(1.05);\n    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}"

start_idx = css.find(start_marker)
end_idx = css.find(end_marker) + len(end_marker)

if start_idx != -1 and end_idx != -1:
    old_block = css[start_idx:end_idx]
    
    new_block = """/* Crazy Dynamic 3D Theme Switch */
.theme-switch-wrapper {
    position: relative;
    margin-bottom: 5px;
    perspective: 1000px; /* Enable 3D space */
}

.theme-switch {
    width: 45px;
    height: 45px;
    background: transparent;
    border: 1px solid var(--glass-border);
    border-radius: 0;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.0);
}

.theme-switch::before {
    content: '';
    position: absolute;
    inset: -5px;
    border: 1px solid var(--accent-teal);
    opacity: 0;
    transition: all 0.3s ease;
    transform: translateZ(-1px);
}

.theme-switch:hover {
    border-color: var(--accent-teal);
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.4);
}

.theme-switch:hover::before {
    opacity: 0.5;
    animation: pingBox 1.5s infinite;
}

@keyframes pingBox {
    0% { inset: -1px; opacity: 0.5; }
    100% { inset: -10px; opacity: 0; }
}

[data-theme='light'] .theme-switch {
    transform: rotateY(180deg);
    border-color: var(--accent-blue);
    box-shadow: 0 0 15px rgba(0, 51, 204, 0.0);
}

[data-theme='light'] .theme-switch:hover {
    border-color: var(--accent-blue);
    box-shadow: 0 0 20px rgba(0, 51, 204, 0.3);
}

[data-theme='light'] .theme-switch::before {
    border-color: var(--accent-blue);
}

.theme-switch i {
    position: absolute;
    font-size: 22px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transition: all 0.3s ease;
}

.theme-switch .ph-moon {
    color: var(--accent-teal);
    text-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
    transform: rotateY(0deg); /* Faces front in dark mode (default) */
}

.theme-switch .ph-sun {
    color: #FFB800; /* Distinct sharp amber */
    text-shadow: 0 0 10px rgba(255, 184, 0, 0.6);
    transform: rotateY(180deg); /* Faces front in light mode */
}

.switch-handle {
    display: none !important; /* Hijack old toggle knob */
}

/* Enhancing the cinematic bloom a bit */
body.theme-vortex {
    animation: digitalGlitch 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes digitalGlitch {
    0% { filter: contrast(1) blur(0) hue-rotate(0deg); transform: scale(1); }
    20% { filter: contrast(1.5) blur(2px) hue-rotate(90deg); transform: scale(1.02); }
    50% { filter: contrast(1.2) blur(5px) hue-rotate(-90deg) invert(0.1); transform: scale(0.98); }
    80% { filter: contrast(1.5) blur(2px) hue-rotate(90deg); transform: scale(1.01); }
    100% { filter: contrast(1) blur(0) hue-rotate(0); transform: scale(1); }
}"""
    
    css = css[:start_idx] + new_block + css[end_idx:]
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("Theme button successfully redesigned.")
else:
    print("Could not find the target CSS block to replace.")
