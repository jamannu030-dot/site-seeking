
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

    // AR Cursor Removed as requested

    // AR/VR Motion Graphics Background Injection
    if (!document.querySelector('.global-video-bg')) {
        const video = document.createElement('video');
        video.className = 'global-video-bg';
        video.src = 'https://cdn.pixabay.com/video/2021/08/04/83896-584742490_large.mp4'; // Beautiful dark geometric grid / abstract architectural lines
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Ensure video stays completely behind the UI with proper overlay blending
        video.style.position = 'fixed';
        video.style.top = '50%';
        video.style.left = '50%';
        video.style.minWidth = '100%';
        video.style.minHeight = '100%';
        video.style.width = 'auto';
        video.style.height = 'auto';
        video.style.zIndex = '-999';
        video.style.transform = 'translate(-50%, -50%)';
        video.style.objectFit = 'cover';
        // Opacity is now managed in styles.css for theme transitions
        video.style.pointerEvents = 'none';
        
        document.body.prepend(video);
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
        if(!heading.classList.contains("kinetic-text") && !heading.classList.contains("reveal") && !heading.classList.contains("not-kinetic")) {
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
    
    // 5. Dynamic Heritage Photo Background Injection
    initHeritageBackgrounds();
});

function initHeritageBackgrounds() {
    if (document.querySelector('.dynamic-photo-bg')) return;

    const container = document.createElement('div');
    container.className = 'dynamic-photo-bg';
    
    const page = window.location.pathname.split('/').pop() || 'index.html';
    
    // Pinterest-style URLs exclusively focusing on Places and Architecture
    const heritagePhotos = [
        'https://images.unsplash.com/photo-1590424753062-32517f354a9b', // Amer Fort
        'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33', // Hawa Mahal
        'https://images.unsplash.com/photo-1576485290814-1c72f4007325', // Birla Mandir / Temple
        'https://images.unsplash.com/photo-1604176354204-92687a419eb1', // Jal Mahal
        'https://images.unsplash.com/photo-1584346946654-20d43ac0eb91', // Temple Architecture
        'https://images.unsplash.com/photo-1580462611434-39cde8c29330', // Minaret / Tower
        'https://images.unsplash.com/photo-1598322312687-32b005fe438f', // Govind Dev Ji / Temple Interior
        'https://images.unsplash.com/photo-1548625361-2495b6c34bd3', // Historic Church
        'https://images.unsplash.com/photo-1631580554160-59f2afdf9452', // Fort Walls
        'https://images.unsplash.com/photo-1601614006579-22a7f5fbab78', // Nahargarh Ramparts
        'https://images.unsplash.com/photo-1598926978438-fb8d97bebc57', // Patrika Gate
        'https://images.unsplash.com/photo-1616423640778-28d1b53229bd', // Royal Cenotaphs (Chhatris)
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da', // Classical Indian Architecture
        'https://images.unsplash.com/photo-1600682855561-729938d21272', // Stepwell (Baori) Architecture
        'https://images.unsplash.com/photo-1590050720465-b3e3af72eb0f', // Jama Masjid / Historic Mosque
        'https://images.unsplash.com/photo-1585135118742-1e96fbc8a238', // Historic Fort structure
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220', // Ancient Temple Facade
        'https://images.unsplash.com/photo-1623861614911-30e463a5ba85', // Rajasthan Palace
        'https://images.unsplash.com/photo-1557088927-4a0077ecba08', // Ancient Stone Carvings
        'https://images.unsplash.com/photo-1596701104618-fa086574f1ed'  // Intricate Temple Gopuram
    ];

    const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

    if (page === 'index.html' || page === '') {
        // 5x5 grid moving upwards continuously
        const gridContainer = document.createElement('div');
        gridContainer.className = 'bg-grid-container';
        gridContainer.style.transform = 'rotate(0deg) scale(1.2)';
        
        for (let i = 0; i < 5; i++) {
            const col = document.createElement('div');
            col.className = 'bg-grid-col bg-grid-col-up';
            col.style.animationDuration = `${15 + Math.random() * 10}s`;
            
            const photos = shuffle(heritagePhotos).slice(0, 8);
            const loopPhotos = [...photos, ...photos]; // duplicate for seamless loop
            
            loopPhotos.forEach(url => {
                const img = document.createElement('div');
                img.className = 'grid-photo';
                img.style.backgroundImage = `url('${url}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')`;
                col.appendChild(img);
            });
            gridContainer.appendChild(col);
        }
        container.appendChild(gridContainer);
    } 
    else if (page === 'login.html' || page === 'register.html') {
        // 5 columns, alternating up/down directions
        const gridContainer = document.createElement('div');
        gridContainer.className = 'bg-grid-container';
        gridContainer.style.transform = 'rotate(-10deg) scale(1.5)';
        
        for (let i = 0; i < 5; i++) {
            const col = document.createElement('div');
            col.className = i % 2 === 0 ? 'bg-grid-col bg-grid-col-up' : 'bg-grid-col bg-grid-col-down';
            col.style.animationDuration = `${20 + Math.random() * 5}s`;
            
            const photos = shuffle(heritagePhotos).slice(0, 8);
            const loopPhotos = [...photos, ...photos];
            
            loopPhotos.forEach(url => {
                const img = document.createElement('div');
                img.className = 'grid-photo';
                img.style.backgroundImage = `url('${url}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')`;
                col.appendChild(img);
            });
            gridContainer.appendChild(col);
        }
        container.appendChild(gridContainer);
    } 
    else if (page === 'explore.html') {
        // Horizontal sliding rows
        const gridContainer = document.createElement('div');
        gridContainer.className = 'bg-grid-row-container';
        gridContainer.style.transform = 'rotate(5deg) scale(1.5)';
        
        for (let i = 0; i < 5; i++) {
            const row = document.createElement('div');
            row.className = i % 2 === 0 ? 'bg-grid-col-left' : 'bg-grid-col-right';
            row.style.animationDuration = `${10 + Math.random() * 5}s`;
            
            const photos = shuffle(heritagePhotos).slice(0, 12);
            const loopPhotos = [...photos, ...photos];
            
            loopPhotos.forEach(url => {
                const img = document.createElement('div');
                img.className = 'grid-photo-hz';
                img.style.backgroundImage = `url('${url}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')`;
                row.appendChild(img);
            });
            gridContainer.appendChild(row);
        }
        container.appendChild(gridContainer);
    } else {
        // Fallback for other pages
        return;
    }

    document.body.prepend(container);
}
