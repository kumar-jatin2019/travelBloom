let travelData = [];
const recommendationsContainer = document.getElementById('recommendationsContainer');
recommendationsContainer.style.display = 'none'; // Hide recommendations initially

// Fetch travel data
async function fetchTravelData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        travelData = data; // Store the fetched travel data
    } catch (error) {
        console.error('Error fetching travel data:', error);
    }
}

// Display recommendations
function displayRecommendations(countries) {
    recommendationsContainer.innerHTML = ''; // Clear previous results

    if (countries.length === 0) {
        recommendationsContainer.innerHTML = `<p class="no-results">No recommendations found.</p>`;
        recommendationsContainer.style.display = 'flex'; // Show message
        return;
    }

    countries.forEach(country => {
        country.cities.forEach(city => {
            const cityHTML = `
                <div class="city-card">
                    <h3>${city.name}</h3>
                    <p>${city.description}</p>
                </div>
            `;
            recommendationsContainer.innerHTML += cityHTML;
        });
    });
    recommendationsContainer.style.display = 'flex'; // Show recommendations
}

// Perform search when Search button is clicked
document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase().trim();

    if (searchInput === '') {
        recommendationsContainer.style.display = 'none'; // Hide recommendations
        recommendationsContainer.innerHTML = ''; // Clear previous results
        alert('Please enter a keyword to search.');
        return;
    }

    const filteredData = travelData.countries.map(country => ({
        ...country,
        cities: country.cities.filter(city =>
            city.name.toLowerCase().includes(searchInput) ||
            city.description.toLowerCase().includes(searchInput)
        )
    })).filter(country => country.cities.length > 0);

    if (filteredData.length > 0) {
        displayRecommendations(filteredData);
    } else {
        recommendationsContainer.style.display = 'flex';
        recommendationsContainer.innerHTML = `<p class="no-results">No recommendations found.</p>`;
    }
});

// Clear search results and reset the input when Reset button is clicked
document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('search-input').value = ''; // Clear search input
    recommendationsContainer.style.display = 'none'; // Hide recommendations
    recommendationsContainer.innerHTML = ''; // Clear previous results
});

// Fetch travel data on page load
fetchTravelData();
