// Define base URL for weather API //
const apiUrl = "https://api.open-meteo.com/v1/forecast"; // Replace with the actual API endpoint

//Set parameters for API request, including location and data type //
const params = {
  latitude: 18.2185, // Example latitude for Jayuya, Puerto Rico
  longitude: 66.5950, // Example longitude for Jayuya, Puerto Rico
  hourly: "temperature_2m", //Request hourly temperature data
};

//Get the container element where data will be displayed
const dataContainer = document.getElementById("dataContainer");

//Add event listener for fetching current weather
document.getElementById("fetchCurrentWeather").addEventListener("click", () => {
  fetchWeatherData("current");
});

//Add event listener for fetching weather forecast
document.getElementById("fetchForecast").addEventListener("click", () => {
  fetchWeatherData("forecast");
});

//Function to fetch weather data based on the type
async function fetchWeatherData(type) {
  try {
    // Show loading message //
    dataContainer.textContent = "Loading...";

    //construct the query string based on the type of data requested
    let queryString;
    if (type === "current") {
      //Include current weather parameter if fetching current data
      queryString = new URLSearchParams({
        ...params,
        current_weather: true, // Parameter might need verification
      }).toString();
    } else if (type === "forecast") {
      //Use default parameters for forecast data
      queryString = new URLSearchParams(params).toString();
    }

    //Construct full URL for API request
    const fullUrl = `${apiUrl}?${queryString}`;
    const response = await fetch(fullUrl);

    //Check if response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    //Parse JSON data from response
    const data = await response.json();
    //Display fetched data
    displayData(data, type);
  } catch (error) {
    //Log errors to the console and update UI
    console.error("Error fetching weather data:", error);
    dataContainer.textContent = "Failed to load data. Please try again later.";
  }
}

//Function to display fetched weather data
function displayData(data, type) {
  //Clear any previous data from container
  dataContainer.innerHTML = "";

  // Display current weather data
  if (type === "current") {
    const currentWeather = data.current_weather; // Adjust based on actual data structure
    if (currentWeather) {
      const div = document.createElement("div");
      div.textContent = `Current Temperature: ${currentWeather.temperature}°C`; // Example
      dataContainer.appendChild(div);
    } else {
      dataContainer.textContent = "Current weather data not available.";
    }
  } else if (type === "forecast") {
    //Display forecast data
    const hourlyData = data.hourly.temperature_2m; // Adjust based on actual data structure
    if (hourlyData) {
      hourlyData.forEach((temp, index) => {
        const div = document.createElement("div");
        div.textContent = `Hour ${index}: ${temp}°C`; // Example
        dataContainer.appendChild(div);
      });
    } else {
      dataContainer.textContent = "Forecast data not available.";
    }
  }
}
