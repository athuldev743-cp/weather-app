async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apiKey = "771f80a1ffab2694f3d6ae3ec5ed840d"; // ✅ Your working API key
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

    document.getElementById("popupContent").innerHTML = `
      <h3>${data.name.toUpperCase()}</h3>
      🌡️ <strong>Temp:</strong> ${temp}°C<br>
      🌬️ <strong>Feels like:</strong> ${feelsLike}°C<br>
      ☁️ <strong>Condition:</strong> ${condition}<br>
      💧 <strong>Humidity:</strong> ${humidity}%<br>
      🌀 <strong>Wind:</strong> ${wind} m/s
    `;

    document.getElementById("weatherPopup").style.display = "block";

  } catch (error) {
    alert(error.message);
  }
}

// Optional: Close popup when clicked outside
window.onclick = function (e) {
  const popup = document.getElementById("weatherPopup");
  if (e.target === popup) popup.style.display = "none";
};
