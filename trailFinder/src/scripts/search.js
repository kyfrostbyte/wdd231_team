import { renderTrailCard } from './templates.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    const searchResults = document.getElementById('search-results');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const lengthFilter = document.getElementById('length-filter');
    const elevationFilter = document.getElementById('elevation-filter');
    const ratingFilter = document.getElementById('rating-filter');


    let trails = [];

    // Load trails data
    fetch('./src/scripts/trail-data.json')
        .then(response => response.json())
        .then(data => {
            trails = data;
            applyFiltersFromURL();
        });

    function displayTrails(filteredTrails) {
        searchResults.innerHTML = '';

        filteredTrails.forEach(trail => {
            searchResults.appendChild(renderTrailCard(trail));
        });
    }

    function applyFiltersFromURL() {
        const params = new URLSearchParams(window.location.search);

        // Pre-fill form inputs
        searchBox.value = params.get('search') || '';
        difficultyFilter.value = params.get('difficulty') || '';
        lengthFilter.value = params.get('length') || '';
        elevationFilter.value = params.get('elevation') || '';
        ratingFilter.value = params.get('rating') || '';

        // Run filter
        filterTrails();
    }

    function updateURLFromFilters() {
        const params = new URLSearchParams();

        if (searchBox.value) params.set('search', searchBox.value);
        if (difficultyFilter.value) params.set('difficulty', difficultyFilter.value);
        if (lengthFilter.value) params.set('length', lengthFilter.value);
        if (elevationFilter.value) params.set('elevation', elevationFilter.value);
        if (ratingFilter.value) params.set('rating', ratingFilter.value);

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        history.replaceState(null, '', newUrl);
    }

    function filterTrails() {
        let filteredTrails = trails;

        const searchTerm = searchBox.value.toLowerCase();
        if (searchTerm) {
            filteredTrails = filteredTrails.filter(trail =>
                trail.name.toLowerCase().includes(searchTerm)
            );
        }

        const difficulty = difficultyFilter.value;
        if (difficulty) {
            filteredTrails = filteredTrails.filter(
                trail => trail.difficulty.toLowerCase() === difficulty
            );
        }

        const length = lengthFilter.value;
        if (length) {
            const [min, max] = length.split('-').map(parseFloat);
            if (!isNaN(min)) {
                if (isNaN(max)) {
                    filteredTrails = filteredTrails.filter(trail => trail.length >= min);
                } else {
                    filteredTrails = filteredTrails.filter(
                        trail => trail.length >= min && trail.length <= max
                    );
                }
            }
        }

        const elevation = elevationFilter.value;
        if (elevation) {
            const [min, max] = elevation.split('-').map(parseFloat);
            if (!isNaN(min)) {
                if (isNaN(max)) {
                    filteredTrails = filteredTrails.filter(trail => trail.elevationGain >= min);
                } else {
                    filteredTrails = filteredTrails.filter(
                        trail => trail.elevationGain >= min && trail.elevationGain <= max
                    );
                }
            }
        }

        const rating = ratingFilter.value;
        if (rating) {
            filteredTrails = filteredTrails.filter(trail => trail.rating >= parseFloat(rating));
        }

        displayTrails(filteredTrails);
        updateURLFromFilters();
    }

    searchBox.addEventListener('input', filterTrails);
    difficultyFilter.addEventListener('change', filterTrails);
    lengthFilter.addEventListener('change', filterTrails);
    elevationFilter.addEventListener('change', filterTrails);
    ratingFilter.addEventListener('change', filterTrails);
});
