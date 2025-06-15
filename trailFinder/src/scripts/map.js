const ACCESS_TOKEN = 'pk.eyJ1IjoidHJveW8xIiwiYSI6ImNtYjcxc3dnbTAyZTUycm9odzJiNHc4a3QifQ.Dlfa6v5rYq27SCK6T7_3dg';
mapboxgl.accessToken = ACCESS_TOKEN;

const script = document.getElementById('search-js');
script.onload = function() {
    const mapboxAccessToken = ACCESS_TOKEN;

    // Instantiate the map
    const map = new mapboxgl.Map({
        accessToken: mapboxAccessToken,
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [38.8951, -77.0364],
        zoom: 3
    });

    // Instantiate the search box
    const searchBox = new mapboxsearch.MapboxSearchBox();
    searchBox.accessToken = mapboxAccessToken;
    searchBox.options = {
        language: 'es',
        country: 'US'
    };

    // Enable marker and bind to map
    searchBox.mapboxgl = mapboxgl;
    searchBox.marker = true;
    searchBox.bindMap(map);

    searchBox.addEventListener('retrieve', (e) => {
        const feature = e.detail; // This is the GeoJSON object for the selected result
        console.log(feature);
    });

    // Add the search box to the DOM
    document.querySelector('.search-input-group').appendChild(searchBox);
}
