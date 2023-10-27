async function addText(text, bold = false) {
  const div = document.getElementById("div");
  if (bold) {
    const strong = document.createElement("strong");
    strong.textContent = text;
    div.appendChild(strong);
    div.appendChild(document.createElement("br")); // Add a line break
  } else {
    div.textContent += text;
    div.appendChild(document.createElement("br")); // Add a line break
  }
}

async function getCity()  {
  const input = document.getElementById("city");
  return input.value;
}

async function getWeather(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4fafcbecd79300e833ab8f48ac964276&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const mainWeather = data.weather[0].main;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      addText(`Weather in ${city}:`, true); // Use `true` to make text bold
      addText(`Weather: ${mainWeather}`);
      addText(`Temperature: ${temperature}°C`);
      addText(`Humidity: ${humidity}%`);
    } else {
      addText("Failed to retrieve weather data.");
    }
  } catch (error) {
    console.error("Failed to retrieve weather data.");
  }
}

async function main() {
  const city = await getCity();
  getWeather(city);
}
