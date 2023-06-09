const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const input = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

function searchWeather() {
  const apiKey = '5736dd6041c95a07eb43b97cb844ae83';
  const city = input.value;

  if (city === '')
    return;

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod == '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'img/clear.png';
          break;
        case 'Rain':
          image.src = 'img/rain.png';
          break;
        case 'Cloud':
          image.src = 'img/cloud.png';
          break;
        case 'Snow':
          image.src = 'img/snow.png';
          break;
        case 'Haze':
          image.src = 'img/mist.png';
          break;
        default:
          image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';
    });
}

search.addEventListener('click', searchWeather);
input.addEventListener('keypress', event => {
  if (event.key == 'Enter')
    searchWeather()
});
