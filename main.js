// Simulated destinations data
const destinations = [
    "Paris, France",
    "New York, USA",
    "Tokyo, Japan",
    "Sydney, Australia",
    "Cape Town, South Africa",
    "Rio de Janeiro, Brazil",
    "Rome, Italy",
    "Bangkok, Thailand"
];

// Search functionality
document.getElementById("search-btn").addEventListener("click", () => {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const resultsContainer = document.getElementById("results-container");

    // Clear previous results
    resultsContainer.innerHTML = "";

    // Filter and display results
    const filteredDestinations = destinations.filter(destination =>
        destination.toLowerCase().includes(query)
    );

    if (filteredDestinations.length > 0) {
        filteredDestinations.forEach(destination => {
            const resultItem = document.createElement("div");
            resultItem.className = "result-item";
            resultItem.textContent = destination;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = "<p>No results found</p>";
    }
});
