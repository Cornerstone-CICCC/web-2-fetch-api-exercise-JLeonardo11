const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current_weather=true&timezone=auto";

document.addEventListener("DOMContentLoaded", () => {
  const weatherInfo = document.getElementById("weather-info");

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const weather_forecast = data.current_weather;
      const timezone = data.timezone;

      const temperature = weather_forecast.temperature;
      const windSpeed = weather_forecast.windspeed;
      const part_of_day = weather_forecast.part_of_day ? "Day" : "Night";
      const time = new Date(weather_forecast.time).toLocaleString();

      weatherInfo.innerHTML = `
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
        <p><strong>Timezone:</strong> ${timezone}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Condition:</strong> ${part_of_day}</p>
      `;
    })
    .catch(error => {
      weatherInfo.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
      console.error("There was a problem with the Fetch API:", error);
    });
});
