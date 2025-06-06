const apiUrl = 'https://api.open-meteo.com/v1/forecast'; // Replace with the actual API endpoint
const params = {
  latitude: 35.6895, // Example latitude for Tokyo
  longitude: 139.6917, // Example longitude for Tokyo
  hourly: 'temperature_2m'
};

const queryString = new URLSearchParams(params).toString();
const fullUrl = `${apiUrl}?${queryString}`;

async function fetchWeatherData() {
  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data); // Process the weather data as needed
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

fetchWeatherData();