const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}`
const apiKey = '82647712d096268160226412236456'
// Inside searchCity() function

fetch(url)
  .then(response => response.json())
  .then(data => {

    // data contains weather data for city

    // Process data as needed 
    // e.g. extract relevant info, update UI

  })
  .catch(error => {
    // Handle error
  });


// Get reference to search form
const searchForm = document.getElementById('search-form');

// Add submit event listener
searchForm.addEventListener('submit', (event) => {

  // Prevent default form submit behavior
  event.preventDefault();
  
  // Get value entered in search input
  const searchTerm = document.getElementById('City Name').value;

  if (searchTerm) {
    // Call function to handle search
    searchCity(searchTerm); 
  }

});

function searchCity(city) {
  // Function code to handle search
  // e.g. API call, update UI
}

// After searching for a city

let cities = [];

if (localStorage.getItem('cities')) {
  cities = JSON.parse(localStorage.getItem('cities'));
}

// Only add new city if not already in list
if(!cities.includes(city)) {
  cities.push(city);

  // Save updated cities array
  localStorage.setItem('cities', JSON.stringify(cities)); 
}

// Get reference to history list
const historyList = document.getElementById('search-history');

// Loop through saved cities and add to list
cities.forEach(savedCity => {

  const listItem = document.createElement('li');

  listItem.textContent = savedCity;
  listItem.classList.add('list-group-item', 'city-btn');

  // Add click handler to rerun search
  listItem.addEventListener('click', () => {
    searchCity(savedCity); 
  });

  historyList.appendChild(listItem);

});

// Inside searchCity() after getting weather data response

// Extract relevant data 
const temp = data.main.temp; 
const humidity = data.main.humidity;
const wind = data.wind.speed;
const uvIndex = data.value;
const iconCode = data.weather[0].icon;

// Convert temp to Fahrenheit 
const fahrenheit = (temp - 273.15) * 1.80 + 32;

// Style UV index based on severity
let uvColor;
if(uvIndex <= 2) {
  uvColor = 'green';
} else if(uvIndex <= 5) { 
  uvColor = 'yellow';
} else if(uvIndex <= 7) {
  uvColor = 'orange';
} else {
  uvColor = 'red';
}

// Update DOM elements
document.getElementById('main-city-temp').textContent = `Temperature: ${fahrenheit.toFixed(1)} °F`;
document.getElementById('main-city-humid').textContent = `Humidity: ${humidity}%`;  
document.getElementById('main-city-wind').textContent = `Wind Speed: ${wind} MPH`;
document.getElementById('main-city-uv').innerHTML = `UV Index: <span id="uv-box" style="background-color: ${uvColor}" class="px-2 py-1 mb-1 text-light rounded font-weight-normal">${uvIndex}</span>`;

// Get icon URL using code
const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

// Set as image source
document.getElementById('weather-icon').src = iconUrl;

// After getting current weather data

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

fetch(forecastUrl)
  .then(response => response.json())
  .then(data => {

    // Get array of forecast objects 
    const forecasts = data.list;
    
    // Loop through each forecast 
    forecasts.forEach(forecast => {

      // Extract relevant data
      const forecastDate = new Date(forecast.dt_txt); 
      const iconCode = forecast.weather[0].icon;
      const temp = forecast.main.temp;
      const wind = forecast.wind.speed;

      // Format temp
      const fahrenheit = (temp - 273.15) * 1.80 + 32;

      // Create element for forecast
      const forecastEl = document.createElement('div');
      forecastEl.innerHTML = `
        <h5>${forecastDate.toDateString()}</h5>
        <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png"/>
        <p>Temp: ${fahrenheit.toFixed(1)} °F</p>
        <p>Wind: ${wind} MPH</p>
      `;

      // Append to forecast cards
      document.getElementById('five-day').appendChild(forecastEl);

    });

  })
  .catch(error => {
    // Handle invalid city error
  });

// Inside searchCity() function
function searchCity(city) {
  // Define URL
  const url = apiUrl.replace('{lat}', city.lat).replace('{lon}', city.lon);

  fetch(url)
    .then(response => response.json())
    .then(data => {

      // Extract relevant data
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      const uvIndex = data.value;
      const iconCode = data.weather[0].icon;

      // Convert temp to Fahrenheit
      const fahrenheit = (temp - 273.15) * 1.80 + 32;

      // Style UV index based on severity
      let uvColor;
      if(uvIndex <= 2) {
        uvColor = 'green';
      } else if(uvIndex <= 5) {
        uvColor = 'yellow';
      } else if(uvIndex <= 7) {
        uvColor = 'orange';
      } else {
        uvColor = 'red';
      }

      // Update DOM elements
      document.getElementById('main-city-temp').textContent = `Temperature: ${fahrenheit.toFixed(1)} °F`;
      document.getElementById('main-city-humid').textContent = `Humidity: ${humidity}%`;
      document.getElementById('main-city-wind').textContent = `Wind Speed: ${wind} MPH`;
      document.getElementById('main-city-uv').innerHTML = `UV Index: <span id="uv-box" style="background-color: ${uvColor}" class="px-2 py-1 mb-1 text-light rounded font
      -weight-normal">${uvIndex}</span>`;
      // Get icon URL using code
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      // Set as image source
      document.getElementById('weather-icon').src = iconUrl;
      // Get 5 day forecast data
      const forecastUrl = `${apiUrl.forecast}?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`;
      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
          // Get array of forecast objects
          const forecasts = data.list;
          // Loop through each forecast
          forecasts.forEach(forecast => {
            // Extract relevant data
            const forecastDate = new Date(forecast.dt_txt);
            const iconCode = forecast.weather[0].icon;
            const temp = forecast.main.temp;
            const wind = forecast.wind.speed;
            // Format temp
            const fahrenheit = (temp - 273.15) * 1.80 + 32;
            // Create element for forecast
            const forecastEl = document.createElement('div');
            forecastEl.innerHTML = `
              <h5>${forecastDate.toDateString()}</h5>
              <img src="http://openweathermap.org/img/wn/${iconCode}.png"/>
              <p>Temp: ${fahrenheit.toFixed(1)} °F</p>
              <p>Wind: ${wind} MPH</p>
            `;
            // Append to forecast cards
            document.getElementById('five-day').appendChild(forecastEl);
          });
        })
        .catch(error => {
          // Handle invalid city error
        });
    }
)};
