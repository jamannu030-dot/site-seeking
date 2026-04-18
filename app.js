let userLocation = null;

// Initialize Geolocation with Session Persistence
function initGeolocation() {
    // Check if we already have it for this session to avoid redundant prompts/wait
    const cachedLoc = sessionStorage.getItem('siteSeeking_sessionLoc');
    if (cachedLoc) {
        userLocation = JSON.parse(cachedLoc);
        console.log("Using session-cached location:", userLocation);
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                // Persist for the duration of the browser tab session
                sessionStorage.setItem('siteSeeking_sessionLoc', JSON.stringify(userLocation));
                console.log("User location initialized and cached for session:", userLocation);
            },
            (error) => {
                console.log("Geolocation error:", error.message);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 600000 } // Don't re-ask frequently
        );
    }
}

initGeolocation();

function calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
}

document.addEventListener("DOMContentLoaded", () => {
    // Check if we came from a search redirect
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery && window.location.pathname.includes('explore.html')) {
        const searchInput = document.querySelector('.global-search');
        if(searchInput) {
            searchInput.value = searchQuery;
            triggerRenderSearch(searchQuery);
        }
    }

    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});

/* --- Navigation & Interaction --- */
window.scrollToSection = function() {
    const section = document.getElementById("categories");
    if(section) section.scrollIntoView({ behavior: "smooth" });
};

window.loadCategory = function(type) {
    const container = document.getElementById("results");
    if(!container) return; 
    
    container.innerHTML = ""; 
    
    if (!places[type] || places[type].length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 40px; grid-column: 1/-1;">
                <i class="ph ph-folder-open" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 10px;"></i>
                <p style='color: var(--text-secondary);'>No places currently listed for this category.</p>
            </div>
        `;
        return;
    }

    renderPlacesArray(places[type], container);

    setTimeout(() => {
        container.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
};

window.showSubCategories = function(category) {
    const mainGrid = document.getElementById('main-categories');
    const subGrid = document.getElementById(category + '-sub');
    const title = document.getElementById('category-title');

    if (mainGrid && subGrid) {
        mainGrid.style.display = 'none';
        subGrid.style.display = 'grid';
        if (title) title.innerText = category.charAt(0).toUpperCase() + category.slice(1) + " Categories";
    }
};

window.showMainCategories = function() {
    const mainGrid = document.getElementById('main-categories');
    const subGrids = document.querySelectorAll('.sub-categories');
    const title = document.getElementById('category-title');
    const results = document.getElementById('results');

    if (mainGrid) {
        mainGrid.style.display = 'grid';
        subGrids.forEach(grid => grid.style.display = 'none');
        if (title) title.innerText = "Select a Category";
        if (results) results.innerHTML = "";
    }
};



// Global Interactive Search
window.handleSearch = function(event) {
    const query = event.target.value.toLowerCase().trim();
    
    // Live filter if on explore page
    if (window.location.pathname.includes('explore.html')) {
        if (query === '') {
            const container = document.getElementById("results");
            if(container) container.innerHTML = '';
            return;
        }
        triggerRenderSearch(query);
    } else if (event.key === 'Enter') {
        // Redirect to explore with search query if search triggered on other pages
        window.location.href = `explore.html?search=${encodeURIComponent(query)}`;
    }
};

function triggerRenderSearch(query) {
    const container = document.getElementById("results");
    if(!container) return;
    
    container.innerHTML = "";
    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
    
    let foundPlaces = [];
    if (typeof places !== 'undefined') {
        for (let category in places) {
            places[category].forEach(place => {
                if (place.name.toLowerCase().includes(query) || place.history.toLowerCase().includes(query)) {
                    foundPlaces.push(place);
                }
            });
        }
    }
    
    if (foundPlaces.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 40px; grid-column: 1/-1;">
                <i class="ph ph-magnifying-glass" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 10px;"></i>
                <p style='color: var(--text-secondary);'>No matching sites found in Jaipur for "${query}"</p>
            </div>
        `;
        return;
    }
    
    renderPlacesArray(foundPlaces, container);
}

async function renderPlacesArray(placesArray, container) {
    for (const [index, place] of placesArray.entries()) {
        const placeEl = document.createElement('div');
        placeEl.classList.add('place');
        placeEl.style.animationDelay = `${(index * 0.03)}s`; // Sped up further to 0.03s 
        placeEl.classList.add('slide-in-right'); 
        
        const mapId = `map-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        
        // Accurate metadata
        const rating = place.rating || "4.6";
        const reviews = Number(place.reviews || 1200).toLocaleString();
        const timings = place.timings || "09:00 AM - 06:00 PM";
        const fee = place.fee || "Free Entry";
        const photography = place.photography || "Allowed";

        // Store pre-verified coords if they exist
        if (place.lat && place.lon) {
            placeEl.setAttribute('data-lat', place.lat);
            placeEl.setAttribute('data-lon', place.lon);
        }

        // Initial Distance Display
        let distanceDisplay = "Locating...";
        
        // Fetch coordinates and calculate distance
        // Use a small delay for large lists to respect Nominatim rate limits
        if (index > 0) await new Promise(r => setTimeout(r, 400)); 

        try {
            const query = encodeURIComponent(place.name + ', Jaipur, Rajasthan');
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`);
            const data = await response.json();
            
            if (data && data.length > 0) {
                const destLat = parseFloat(data[0].lat);
                const destLon = parseFloat(data[0].lon);
                
                // Store coords for toggleMap to use
                placeEl.setAttribute('data-lat', destLat);
                placeEl.setAttribute('data-lon', destLon);

                if (userLocation) {
                    const dist = calculateDistance(userLocation.lat, userLocation.lon, destLat, destLon);
                    distanceDisplay = dist ? `${dist} km away` : "Jaipur Center";
                } else {
                    distanceDisplay = "Near Jaipur";
                }
            } else {
                distanceDisplay = "Jaipur, RJ";
            }
        } catch (e) {
            distanceDisplay = "Jaipur, RJ";
        }

        placeEl.innerHTML = `
            <div class="place-header">
                <div>
                    <h3>${place.name}</h3>
                    ${place.address ? `<div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;"><i class="ph ph-map-pin"></i> ${place.address}</div>` : ''}
                    <div class="place-rating" style="display:flex; align-items:center; gap:8px; margin-top:5px; color:var(--text-secondary); font-weight:600;">
                        <span style="color:#f59e0b; display:flex; align-items:center; gap:4px;"><i class="ph-fill ph-star"></i> ${rating}</span>
                        <span style="font-size:0.9rem; opacity:0.8;">(${reviews} Reviews)</span>
                        <span class="distance-tag" id="dist-${mapId}" style="background:transparent; border: 1px solid var(--accent-teal); color:var(--accent-teal); padding:3px 10px; border-radius:0; font-size:0.75rem; margin-left:10px; display:flex; align-items:center; gap:4px;">
                            <i class="ph ph-navigation-arrow"></i> ${distanceDisplay}
                        </span>
                    </div>
                </div>
                <div class="place-actions">
                    <button class="btn-icon" title="Save Place" onclick="savePlace('${place.name.replace(/'/g, "\\'")}')"><i class="ph ph-bookmark-simple"></i></button>
                    <button class="btn-icon" title="Add to Itinerary" onclick="addItinerary('${place.name.replace(/'/g, "\\'")}')"><i class="ph ph-calendar-plus"></i></button>
                    <button class="btn-secondary" onclick="toggleMap(this, '${mapId}')"><i class="ph ph-map-pin"></i> View on Map</button>
                </div>
            </div>

            <div class="place-meta" style="display:flex; flex-wrap:wrap; gap:15px; margin-top:20px; padding:15px; background:rgba(0, 229, 255, 0.05); border-radius:0; border:1px solid rgba(0, 229, 255, 0.2);">
                <div class="meta-item" style="display:flex; align-items:center; gap:6px; color:var(--accent-blue); font-weight:500; font-size:0.95rem;"><i class="ph ph-clock"></i> ${timings}</div>
                <div class="meta-item" style="display:flex; align-items:center; gap:6px; color:var(--accent-blue); font-weight:500; font-size:0.95rem;"><i class="ph ph-ticket"></i> ${fee}</div>
                <div class="meta-item" style="display:flex; align-items:center; gap:6px; color:var(--accent-blue); font-weight:500; font-size:0.95rem;"><i class="ph ph-camera"></i> Photography: ${photography}</div>
            </div>

            <div class="manual-calc" style="margin-top:20px; display:flex; gap:10px; background:var(--card-bg); padding:10px; border-radius:0; border: 1px solid var(--glass-border);">
                <input type="text" placeholder="Enter starting point (e.g. Jaipur Railway Station)" style="flex:1; background:transparent; border:none; color:var(--text-primary); outline:none; font-size:0.85rem;" onkeypress="if(event.key === 'Enter') manualCalculate(this, '${place.name}', 'dist-${mapId}')">
                <button onclick="manualCalculate(this.previousElementSibling, '${place.name}', 'dist-${mapId}')" class="btn-primary" style="padding: 8px 15px; font-size: 0.85rem;">Calculate</button>
            </div>

            <p style="margin-top: 15px;">${place.history}</p>
            
            <div class="map-container" id="${mapId}" data-placename="${place.name.replace(/"/g, '&quot;')}" data-mapurl="${place.map}">
            </div>
        `;
        container.appendChild(placeEl);
        
        // Animation trigger for slide-in cards
        setTimeout(() => placeEl.classList.add('visible'), 50);
    }
}

window.toggleMap = async function(btnElement, mapId) {
    const placeCard = btnElement.closest('.place');
    const mapContainer = placeCard.querySelector('.map-container');
    const placeName = mapContainer.getAttribute('data-placename');
    
    // Find coordinates from data-attributes if we already rendered them
    const dataLat = placeCard.getAttribute('data-lat');
    const dataLon = placeCard.getAttribute('data-lon');
    
    if (mapContainer.classList.contains('active')) {
        mapContainer.classList.remove('active');
        btnElement.innerHTML = `<i class="ph ph-map-pin"></i> View on Map`;
        btnElement.classList.remove('active-btn');
    } else {
        // Close other open maps
        document.querySelectorAll('.map-container.active').forEach(openMap => {
            if (openMap !== mapContainer) {
                openMap.classList.remove('active');
                const openBtn = openMap.parentElement.querySelector('.btn-secondary.active-btn');
                if(openBtn) {
                    openBtn.innerHTML = `<i class="ph ph-map-pin"></i> View on Map`;
                    openBtn.classList.remove('active-btn');
                }
            }
        });
        
        mapContainer.classList.add('active');
        btnElement.innerHTML = `<i class="ph ph-map-pin-line"></i> Hide Map`;
        btnElement.classList.add('active-btn');

        if (!mapContainer.hasAttribute('data-map-initialized')) {
            mapContainer.innerHTML = '<div style="display:flex; justify-content:center; align-items:center; height:100%; color: var(--text-secondary);"><i class="ph ph-spinner ph-spin" style="font-size: 2rem; margin-right: 10px;"></i> Locating...</div>';
            
            try {
                let lat, lon;

                // Priority 1: Use hardcoded coords from the card if available
                if (dataLat && dataLon) {
                    lat = parseFloat(dataLat);
                    lon = parseFloat(dataLon);
                } else {
                    // Priority 2: Pin-point location search via API
                    const query = encodeURIComponent(placeName + ', Jaipur, Rajasthan');
                    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`);
                    const data = await response.json();
                    
                    if (data && data.length > 0) {
                        lat = parseFloat(data[0].lat);
                        lon = parseFloat(data[0].lon);
                    } else {
                        lat = 26.9124; lon = 75.7873; // Default to Jaipur Center
                    }
                }
                
                mapContainer.innerHTML = ''; // Clear loading screen
                
                // Initialize proper Google Maps iframe embed
                const encodedAddress = encodeURIComponent(placeName + ', Jaipur, Rajasthan');
                const gmapIframe = document.createElement('iframe');
                gmapIframe.width = "100%";
                gmapIframe.height = "100%";
                gmapIframe.frameBorder = "0";
                gmapIframe.style.border = "0";
                // We use coordinates if high fidelity, otherwise fallback to place name search
                const queryStr = (dataLat && dataLon) ? `${lat},${lon}` : encodedAddress;
                gmapIframe.src = `https://maps.google.com/maps?q=${queryStr}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
                gmapIframe.allowFullscreen = true;
                
                mapContainer.appendChild(gmapIframe);
                mapContainer.setAttribute('data-map-initialized', 'true');
            } catch (err) {
                mapContainer.innerHTML = '<div style="display:flex; justify-content:center; align-items:center; height:100%; color: var(--text-secondary);">Map could not be loaded.</div>';
            }
        }
    }
};

// Helper for admin logging
function logToAdmin(action) {
    const logs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
    const activeUser = localStorage.getItem('siteSeeking_active_user') || 'Unknown User';
    logs.unshift({ id: Math.random().toString(36).substr(2, 9), user: activeUser, action: action, time: new Date().toISOString() });
    localStorage.setItem('admin_logs', JSON.stringify(logs));
}

/* --- Real Functional LocalStorage Methods --- */
window.savePlace = function(name) {
    let saved = JSON.parse(localStorage.getItem(`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_saved`) || '[]');
    if (!saved.includes(name)) {
        saved.push(name);
        localStorage.setItem(`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_saved`, JSON.stringify(saved));
        logToAdmin(`Saved ${name} to bookmarks`);
        alert(`Successfully saved ${name} to your bookmarks!`);
    } else {
        alert(`${name} is already in your saved places.`);
    }
};

window.addItinerary = function(name) {
    let itin = JSON.parse(localStorage.getItem(`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_itinerary`) || '[]');
    if (!itin.includes(name)) {
        itin.push(name);
        localStorage.setItem(`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_itinerary`, JSON.stringify(itin));
        logToAdmin(`Scheduled ${name} in itinerary`);
        alert(`Successfully scheduled ${name} in your itinerary!`);
    } else {
        alert(`${name} is already scheduled.`);
    }
};

window.removeSavedPlace = function(name) {
    let saved = JSON.parse(localStorage.getItem(`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_saved`) || '[]');
    saved = saved.filter(p => p !== name);
    localStorage.setItem(`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_saved`, JSON.stringify(saved));
    logToAdmin(`Removed ${name} from bookmarks`);
    if(window.renderSavedPlaces) window.renderSavedPlaces();
};

window.removeItinerary = function(name) {
    let itin = JSON.parse(localStorage.getItem(`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_itinerary`) || '[]');
    itin = itin.filter(p => p !== name);
    localStorage.setItem(`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_itinerary`, JSON.stringify(itin));
    logToAdmin(`Removed ${name} from itinerary`);
    if(window.renderItinerary) window.renderItinerary();
};

/* --- Device System & Gallery Capabilities --- */
window.handleProfileUpload = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Data = e.target.result;
            try {
                localStorage.setItem(`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_avatar`, base64Data);
                updateAvatars();
                alert("Profile picture successfully updated from gallery!");
            } catch (err) {
                // If the gallery image is too large for localStorage quotas
                alert("Image is too large to save locally. Please choose a smaller file.");
            }
        };
        reader.readAsDataURL(file);
    }
};

function updateAvatars() {
    const avatarData = localStorage.getItem(`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_avatar`);
    if (avatarData) {
        document.querySelectorAll('.profile-pic, .avatar').forEach(el => {
            el.innerHTML = `<img src="${avatarData}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
        });
    }
}

document.addEventListener("DOMContentLoaded", updateAvatars);

// Manual Distance Calculator -> Google Maps Redirect
window.manualCalculate = async function(input, destName, tagId) {
    const origin = input.value;
    if (!origin) {
        alert("Please enter a starting point.");
        return;
    }

    const btn = input.nextElementSibling;
    const originalText = btn.innerText;
    btn.innerText = "Routing...";
    btn.disabled = true;

    try {
        // Build the Google Maps Directions URL
        const originQuery = encodeURIComponent(origin + ', Jaipur, Rajasthan');
        const destQuery = encodeURIComponent(destName + ', Jaipur, Rajasthan');
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originQuery}&destination=${destQuery}&travelmode=driving`;
        
        // Open in new tab
        window.open(mapsUrl, '_blank');
        
        // Update tag visually to show it was clicked
        const tag = document.getElementById(tagId);
        if(tag) {
            tag.innerHTML = `<i class="ph ph-check-circle"></i> Opening Map...`;
            tag.style.background = "var(--accent-teal)"; 
            tag.style.color = "var(--bg-main)";
        }
    } catch (e) {
        console.error(e);
        alert("Failed to open maps.");
    } finally {
        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1000);
    }
};

// Global Form & Button Handlers
function initGlobalHandlers() {
    // 1. Newsletter Handler
    const subscribeBtns = document.querySelectorAll('.subscribe-form button');
    subscribeBtns.forEach(btn => {
        btn.onclick = function() {
            const input = this.previousElementSibling;
            if (input && input.value && input.value.includes('@')) {
                alert(`Success! Thanks for joining Site Seeking. Check your email (${input.value}) for our Jaipur guide.`);
                input.value = '';
            } else {
                alert("Please enter a valid email address.");
            }
        };
    });

    // 2. Contact Form Handler (if present)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.onsubmit = function(e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                logToAdmin("Sent a contact support message");
                alert("Message received! Our Jaipur local guides will get back to you within 24 hours.");
                this.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1200);
        };
    }

    // 3. Add Plan / CTA Buttons
    const addPlanBtn = document.querySelector('.dashboard-header .btn-primary');
    if (addPlanBtn && addPlanBtn.innerText.includes('Add Plan')) {
        addPlanBtn.onclick = () => window.location.href = 'explore.html#categories';
    }
}

// Global Initialization
document.addEventListener("DOMContentLoaded", () => {
    initNewsletter(); // Fallback for legacy calls
    initGlobalHandlers();
    initAIChatbot(); // Inject AI Guide
    
    // Auto-update Avatars
    const avatarData = localStorage.getItem(`siteSeeking_${localStorage.getItem('siteSeeking_active_user') || 'guest'}_avatar`);
    if (avatarData) {
        document.querySelectorAll('.profile-pic, .avatar').forEach(el => {
            el.innerHTML = `<img src="${avatarData}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
        });
    }

    // Auth UI Fixes
    if (localStorage.getItem('siteSeeking_active_user')) {
        document.querySelectorAll('a[href="login.html"]').forEach(link => {
            link.style.display = 'none';
        });
    } else {
        document.querySelectorAll('a[href="dashboard.html"]').forEach(link => {
            if (!link.classList.contains('active')) link.style.display = 'none';
        });
    }

    // Live Sync with Admin Actions
    window.addEventListener('storage', (e) => {
        if (e.key === 'siteSeeking_custom_places') {
            // Hot reload to show the admin's newly created/published place
            alert("The admin has added a new Historical Site to the database! Refreshing to synchronize.");
            window.location.reload();
        }
    });
});

// AI Chatbot Logic
function initAIChatbot() {
    if (document.querySelector('.chatbot-fab')) return; // Already initialized
    if (!localStorage.getItem('siteSeeking_active_user')) return; // Only show to logged in users
    
    // Inject HTML
    const html = `
    <div class="chatbot-wrapper" id="chatbot-wrapper">
        <div class="chatbot-fab" id="chatbot-fab" title="Ask AI Guide">
            <i class="ph-fill ph-robot cursor-move"></i>
        </div>
        <div class="chatbot-window" id="chatbot-window">
            <div class="chat-header" id="chatbot-drag-handle">
                <span><i class="ph-fill ph-sparkle" style="color: #fbbf24;"></i> Heritage AI Guide</span>
                <i class="ph ph-x close-btn" id="chatbot-close"></i>
            </div>
            <div class="chat-messages" id="chatbot-messages">
                <div class="chat-msg bot">Namaste! I'm your AI heritage guide for Jaipur. Are you looking for a peaceful temple, a historic fort, or maybe something hidden and forgotten?</div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chatbot-input" placeholder="E.g., Suggest a peaceful temple...">
                <button id="chatbot-send"><i class="ph-bold ph-paper-plane-right"></i></button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    // Logic
    const wrapper = document.getElementById('chatbot-wrapper');
    const fab = document.getElementById('chatbot-fab');
    const win = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const msgs = document.getElementById('chatbot-messages');
    const dragHandle = document.getElementById('chatbot-drag-handle');

    // Drag Logic
    let isDragging = false, startX, startY, initialBottom, initialRight;

    function onPointerDown(e) {
        if (e.target.closest('#chatbot-close')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = wrapper.getBoundingClientRect();
        // Compute bottom and right based on viewport
        initialBottom = window.innerHeight - rect.bottom;
        initialRight = window.innerWidth - rect.right;
        
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
        e.preventDefault();
    }

    let hasMoved = false;

    function onPointerMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) hasMoved = true;

        wrapper.style.bottom = (initialBottom - dy) + 'px';
        wrapper.style.right = (initialRight - dx) + 'px';
    }

    function onPointerUp(e) {
        isDragging = false;
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
    }

    dragHandle.addEventListener('pointerdown', onPointerDown);
    // Make Fab draggable as well
    fab.addEventListener('pointerdown', (e) => {
        hasMoved = false;
        onPointerDown(e);
    });

    fab.addEventListener('click', (e) => {
        // Prevent toggle if it was a drag
        if (hasMoved) {
            hasMoved = false;
            return;
        }
        win.classList.toggle('active');
        if (win.classList.contains('active')) input.focus();
    });

    closeBtn.addEventListener('click', () => {
        win.classList.remove('active');
    });

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `chat-msg ${sender}`;
        div.textContent = text;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }

    function handleUserInput() {
        const text = input.value.trim();
        if (!text) return;
        
        addMessage(text, 'user');
        input.value = '';

        // Simulate thinking delay
        setTimeout(() => {
            const reply = generateAIResponse(text.toLowerCase());
            addMessage(reply, 'bot');
        }, 800 + Math.random() * 600);
    }

    sendBtn.addEventListener('click', handleUserInput);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });

    function generateAIResponse(query) {
        if (query.includes('temple') || query.includes('peaceful') || query.includes('pray')) {
            return "For a peaceful spiritual experience, I highly recommend 'Govind Dev Ji Temple' inside the City Palace, or 'Birla Mandir' at sunset for its glowing white marble!";
        } else if (query.includes('fort') || query.includes('history') || query.includes('mountain') || query.includes('hill')) {
            return "You cannot miss 'Amer Fort'! It's magnificent. If you want great views of the city, 'Nahargarh Fort' is excellent, especially in the evening.";
        } else if (query.includes('palace') || query.includes('royal')) {
            return "The 'Hawa Mahal' (Palace of Winds) is iconic for photography. Also, 'City Palace' gives you incredible insight into genuine royal heritage.";
        } else if (query.includes('hidden') || query.includes('forgotten') || query.includes('secret')) {
            return "Looking for hidden gems? 'Panna Meena Ka Kund' is an ancient symmetrical stepwell perfectly tucked away from heavy crowds. Great for photos!";
        } else if (query.includes('hello') || query.includes('hi ')) {
            return "Hello there! Tell me what kind of places you like—architecture, nature, or spirituality—and I'll pick the perfect spot for you.";
        } else if (query.includes('thank')) {
            return "You're very welcome! Let me know if you need any other recommendations.";
        } else {
            return "That's interesting! I recommend exploring the 'Categories' section on the dashboard to browse through different heritage clusters based on what visually appeals to you most.";
        }
    }
}