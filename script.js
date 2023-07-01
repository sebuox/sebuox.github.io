const clientId = 'rsbdo-usvu5hwsIqvlCifA';
const apiKey = 'NQsM2CYKBClp6Otfe-7MeOTLAiR4rY-d3XfYNiDFnI7GqCAzAqTgu-CJCh-ahP7CSka-xPzwJqMovSsx-nY-NLgJraeqZjRnDWsWBmhVMNXtGbGDqFXZiRPFjUOgZHYx';

// Retrieve user's location using the Geolocation API
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Callback function to display user's location
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Make API request to Yelp with user's location coordinates
  const yelpAPIUrl = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=food`;

  // Use the retrieved API URL to fetch data from Yelp
  fetch(yelpAPIUrl, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => displayResults(data.businesses))
    .catch(error => console.error(error));
}

// Function to display the search results on the page
function displayResults(restaurants) {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = ''; // Clear previous results

  restaurants.forEach(restaurant => {
    const name = restaurant.name;
    const rating = restaurant.rating;
    const image = restaurant.image_url;

    // Create HTML elements to display the restaurant information
    const restaurantElement = document.createElement('div');
    const nameElement = document.createElement('h2');
    const ratingElement = document.createElement('p');
    const imageElement = document.createElement('img');

    nameElement.innerText = name;
    ratingElement.innerText = `Rating: ${rating}`;
    imageElement.src = image;

    restaurantElement.appendChild(nameElement);
    restaurantElement.appendChild(ratingElement);
    restaurantElement.appendChild(imageElement);

    resultsContainer.appendChild(restaurantElement);
  });
}

// Function to initiate the search with user's location
function searchRestaurants() {
  getLocation();
}
