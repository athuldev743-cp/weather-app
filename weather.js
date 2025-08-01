async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apiKey = "771f80a1ffab2694f3d6ae3ec5ed840d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const condition = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const popupHTML = `
      <img src="${iconUrl}" class="popup_icon" alt="Weather Icon" />
      <h2 class="popup_title">${data.name.toUpperCase()}</h2>
      <p>🌡️ <strong>Temperature:</strong> ${temp}°C</p>
      <p>🌬️ <strong>Feels like:</strong> ${feelsLike}°C</p>
      <p>☁️ <strong>Condition:</strong> ${condition}</p>
      <p>💧 <strong>Humidity:</strong> ${humidity}%</p>
      <p>🌀 <strong>Wind Speed:</strong> ${wind} m/s</p>
      <button class="close_btn" onclick="document.getElementById('weatherPopup').style.display='none'">Close</button>
    `;

    document.getElementById("popupContent").innerHTML = popupHTML;
    document.getElementById("weatherPopup").style.display = "block";

  } catch (error) {
    alert(error.message);
  }
}
