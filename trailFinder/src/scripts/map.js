const ACCESS_TOKEN = 'pk.eyJ1IjoidHJveW8xIiwiYSI6ImNtYjcxc3dnbTAyZTUycm9odzJiNHc4a3QifQ.Dlfa6v5rYq27SCK6T7_3dg';
mapboxgl.accessToken = ACCESS_TOKEN;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [-73.99209, 40.68933],
    zoom: 8.8
});
const searchButton = document.querySelector('.search-button');

let currentMarker = null;
let searchBox = null;

window.addEventListener('load', () => {
    // Initialize the search box but don't add it to the map
    searchBox = new MapboxSearchBox();
    searchBox.accessToken = ACCESS_TOKEN;
    searchBox.options = {
        types: 'address,poi',
        proximity: [-73.99209, 40.68933]
    };
    searchBox.marker = true;
    searchBox.mapboxgl = mapboxgl;
    searchBox.componentOptions = { allowReverse: true, flipCoordinates: true };
    searchBox.options.poi_category = "hiking";
    map.addControl(searchBox);
});

function makeSearch() {
    const searchInput = document.querySelector('#location-search');
    let query = searchInput.value;
    console.log(query);
    searchBox.search(query);
};

searchButton.addEventListener('click', makeSearch);
