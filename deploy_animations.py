# Ultra Dynamic Engine Extensions
import os

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

dynamic_css = """
/* 1. Page Transition Effects */
.page-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #010A1C;
    z-index: 9999;
    transform: scaleY(1);
    transform-origin: top;
    transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
    pointer-events: none;
}
.page-loaded .page-transition-overlay {
    transform: scaleY(0);
    transform-origin: bottom;
}
.page-leaving .page-transition-overlay {
    transform: scaleY(1);
    transform-origin: top;
}

/* 2. Custom AR/Motion Cursor */
body {
    cursor: none;
}
.custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border: 1px solid var(--accent-teal);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, background-color 0.3s;
    mix-blend-mode: difference;
}
.custom-cursor.hovering {
    width: 60px;
    height: 60px;
    background-color: var(--accent-teal);
    opacity: 0.5;
}

/* 3. Real-Time Pseudo 3D Tilt Card Environment */
.tilt-card {
    transform-style: preserve-3d;
    transform: perspective(1000px);
}
.tilt-card-inner {
    transform: translateZ(30px);
}

/* 4. Expressive Typography Animations */
.kinetic-text {
    overflow: hidden;
    display: inline-block;
}
.kinetic-text span {
    display: inline-block;
    transform: translateY(100%);
    opacity: 0;
    animation: kineticRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes kineticRise {
    0% { transform: translateY(100%) rotate(5deg); opacity: 0; }
    100% { transform: translateY(0) rotate(0deg); opacity: 1; }
}

/* 5. Advanced Microinteractions (Buttons) */
.btn-primary {
    position: relative;
    overflow: hidden;
    z-index: 1;
    transform: translateZ(0);
}
.btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: -1;
}
.btn-primary:hover::before {
    left: 100%;
}
"""

if "page-transition-overlay" not in css:
    css += "\n" + dynamic_css

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

# Generate animations.js
js_code = """
document.addEventListener("DOMContentLoaded", () => {
    // 1. Page Transition
    const overlay = document.createElement("div");
    overlay.className = "page-transition-overlay";
    document.body.appendChild(overlay);

    // Short delay to trigger entrance
    requestAnimationFrame(() => {
        document.body.classList.add("page-loaded");
    });

    // Intercept links for exit transition
    document.links_intercepted = false; // Prevent double registration
    if(!document.links_intercepted) {
        document.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", (e) => {
                const target = link.getAttribute("href");
                if(target && !target.startsWith("#") && !target.startsWith("javascript") && target !== "") {
                    e.preventDefault();
                    document.body.classList.remove("page-loaded");
                    document.body.classList.add("page-leaving");
                    setTimeout(() => window.location.href = target, 800);
                }
            });
        });
        document.links_intercepted = true;
    }

    // 2. Custom Interactive AR Cursor
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    // Check if device supports hover (desktop cursor vs mobile touch)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.body.appendChild(cursor);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        let isMoving = false;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if(!isMoving) {
                isMoving = true;
                requestAnimationFrame(renderCursor);
            }
        });

        function renderCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            if (Math.abs(mouseX - cursorX) > 0.1 || Math.abs(mouseY - cursorY) > 0.1) {
                requestAnimationFrame(renderCursor);
            } else {
                isMoving = false;
            }
        }

        // Hover state for cursor (Microinteractions)
        document.querySelectorAll("a, button, .card, .masonry-item").forEach(el => {
            el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
        });
    }

    // 3. 3D Tilt Effect for specific elements
    document.querySelectorAll(".card, .masonry-item, .info-card").forEach(el => {
        el.classList.add("tilt-card");
        
        // Wrap content inside a Z-translated element for deep pseudo-3D
        if(!el.querySelector('.tilt-card-inner') && !el.classList.contains('masonry-item')) {
            const inner = document.createElement('div');
            inner.className = 'tilt-card-inner';
            while(el.firstChild) {
                inner.appendChild(el.firstChild);
            }
            el.appendChild(inner);
            
            // To ensure 3D properties bubble up nicely
            inner.style.height = "100%";
            inner.style.width = "100%";
            inner.style.display = "flex";
            inner.style.flexDirection = "column";
            inner.style.justifyContent = "center";
            inner.style.alignItems = "center";
        }

        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg tilt
            const rotateY = ((x - centerX) / centerX) * 15;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            el.style.transition = "none";
        });
        
        el.addEventListener("mouseleave", () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        });
    });

    // 4. Kinetic Typography Injection
    document.querySelectorAll("h1, h2, h3").forEach(heading => {
        // Exclude specific elements like the main header logo or previously styled elements
        if(!heading.classList.contains("kinetic-text") && !heading.classList.contains("reveal")) {
            const text = heading.innerText;
            // Only split elements with spaces to avoid breaking nested icons
            if(text.includes(' ') || text.length > 5) {
                heading.innerText = "";
                heading.classList.add("kinetic-text");
                const words = text.split(" ");
                words.forEach((word, index) => {
                    const span = document.createElement("span");
                    span.innerText = word + (index < words.length - 1 ? " " : "");
                    span.style.animationDelay = `${index * 0.1}s`;
                    heading.appendChild(span);
                });
            }
        }
    });
});
"""

with open("animations.js", "w", encoding="utf-8") as f:
    f.write(js_code)

def inject_script(filename):
    with open(filename, "r", encoding="utf-8") as f:
        html = f.read()
    if '<script src="animations.js"></script>' not in html:
        html = html.replace("</body>", '    <script src="animations.js"></script>\n</body>')
        with open(filename, "w", encoding="utf-8") as f:
            f.write(html)

inject_script("index.html")
inject_script("explore.html")

print("Dynamic animations successfully deployed.")
