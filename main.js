let travelData = [];
const recommendationsContainer = document.getElementById('recommendationsContainer');
recommendationsContainer.style.display = 'none'; // Hide initially

// Fetch travel data
async function fetchTravelData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        travelData = data;  // Store fetched data
        displayRecommendations(data.countries);  // Initial display
    } catch (error) {
        console.error('Error fetching travel data:', error);
    }
}

// Display recommendations
function displayRecommendations(countries) {
    const recommendationsContainer = document.getElementById('recommendationsContainer');
    recommendationsContainer.innerHTML = ''; // Clear previous results

    if (countries.length === 0) {
        recommendationsContainer.innerHTML = `<p class="no-results">No recommendations found.</p>`;
        return;
    }

    countries.forEach(country => {
        country.cities.forEach(city => {
            // const cityHTML = `
            //     <div class="city-card">
            //         <img src="${city.imageUrl}" alt="${city.name}" />
            //         <h3>${city.name}</h3>
            //         <p>${city.description}</p>
            //     </div>
            // `;
            const cityHTML = `
            <div class="city-card">
                <h3>${city.name}</h3>
                <p>${city.description}</p>
            </div>
        `;
            recommendationsContainer.innerHTML += cityHTML;
        });
    });
}


// Filter recommendations
function filterRecommendations() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const recommendationsContainer = document.getElementById('recommendationsContainer');

    // If search input is empty, hide the recommendations and return early
    if (!searchInput) {
        recommendationsContainer.style.display = 'none'; // Hide on empty search
        recommendationsContainer.innerHTML = '';  // Clear the results
        return;
    }

    // Filter data based on search input
    const filteredData = travelData.countries.map(country => ({
        ...country,
        cities: country.cities.filter(city =>
            city.name.toLowerCase().includes(searchInput) ||
            city.description.toLowerCase().includes(searchInput)
        )
    })).filter(country => country.cities.length > 0); // Remove countries with no matching cities

    // Show or hide the recommendations container based on filtered data
    if (filteredData.length > 0) {
        recommendationsContainer.style.display = 'flex';  // Show the container
        displayRecommendations(filteredData);  // Display the matching cities
    } else {
        recommendationsContainer.style.display = 'none'; // Hide if no results
        recommendationsContainer.innerHTML = '';  // Clear the results if no match
    }
}



// Initial data fetch
fetchTravelData();
