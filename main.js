// Task 6 - Fetch travel data and display recommendations

let travelData = [];

async function fetchTravelData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        travelData = data;  // Store the fetched data
        displayRecommendations(data.countries); // Display recommendations initially
    } catch (error) {
        console.error('Error fetching travel data:', error);
    }
}

// Display recommendations based on fetched data
function displayRecommendations(countries) {
    const recommendationsContainer = document.getElementById('recommendationsContainer');
    recommendationsContainer.innerHTML = '';  // Clear previous results

    countries.forEach(country => {
        country.cities.forEach(city => {
            let cityHTML = `
                <div class="city-card">
                    <h3>${city.name}</h3>
                    <p>${city.description}</p>
                </div>
            `;
        //     let cityHTML = `
        //     <div class="city-card">
        //         <img src="${city.imageUrl}" alt="${city.name}">
        //         <h3>${city.name}</h3>
        //         <p>${city.description}</p>
        //     </div>
        // `;
            recommendationsContainer.innerHTML += cityHTML;
        });
    });
}

// Filter recommendations based on search input
function filterRecommendations() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredData = travelData.countries.map(country => {
        return {
            name: country.name,
            cities: country.cities.filter(city => {
                return city.name.toLowerCase().includes(searchInput) || city.description.toLowerCase().includes(searchInput);
            })
        };
    }).filter(country => country.cities.length > 0);  // Filter out countries with no matching cities

    displayRecommendations(filteredData);  // Display filtered recommendations
}

// Initial data fetch
fetchTravelData();
