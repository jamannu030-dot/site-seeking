function scrollToSection() {
    document.getElementById("categories").scrollIntoView();
}

function loadCategory(type) {
    const container = document.getElementById("results");
    container.innerHTML = "";

    places[type].forEach(place => {
        container.innerHTML += `
        <div class="place">
            <h3>${place.name}</h3>
            <img src="${place.image}" width="100%">
            <p>${place.history}</p>

            <button onclick="toggleMap('${place.map}')">Toggle Map</button>
            <div class="map" style="display:none">
                <iframe src="${place.map}"></iframe>
            </div>
        </div>
        `;
    });
}

function toggleMap(url) {
    const maps = document.querySelectorAll(".map");
    maps.forEach(m => m.style.display = "none");

    event.target.nextElementSibling.style.display = "block";
}