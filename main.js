let travelData = [];

// Fetch travel data
async function fetchTravelData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        travelData = data; // Store the fetched travel data
        // console.log(travelData, "travelData");

// // Flatten cities from all countries into one array
// const allCities = travelData.countries.flatMap(country => country.n);

// // Now allCities will contain all the cities from all countries in a single array:
// console.log(allCities);
    } catch (error) {
        console.error('Error fetching travel data:', error);
    }
}

// Display recommendations
function displayRecommendations(recommendations) {
    recommendationsContainer.innerHTML = ''; // Clear previous results

    if (recommendations.length === 0) {
        recommendationsContainer.innerHTML = `<p class="no-results">No recommendations found.</p>`;
        recommendationsContainer.style.display = 'flex'; // Show message
        return;
    }

    recommendations.forEach(item => {
        const recommendationHTML = `
            <div class="city-card">
                <img src="${item.imageUrl}" alt="${item.name}" />
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;
        recommendationsContainer.innerHTML += recommendationHTML;
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

    // Search in countries
    // Search in countries
    const countryRecommendations = travelData.countries.flatMap(country => 
        country.cities.filter(city =>
            city.name.toLowerCase().includes(searchInput) ||
            city.description.toLowerCase().includes(searchInput)
        )
    );

        // Search in beaches
    const beachRecommendations = travelData.beaches.filter(beach =>
        beach.name.toLowerCase().includes(searchInput) ||
        beach.description.toLowerCase().includes(searchInput)
    );

    // Search in temples
    const templeRecommendations = travelData.temples.filter(temple =>
        temple.name.toLowerCase().includes(searchInput) ||
        temple.description.toLowerCase().includes(searchInput)
    );


    // Combine all results
    const allRecommendations = [...countryRecommendations, ...beachRecommendations , ...templeRecommendations];

    if (allRecommendations.length > 0) {
        displayRecommendations(allRecommendations);
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
