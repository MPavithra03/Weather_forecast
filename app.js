const apikey = '59c60baa1d7025787c678a51032d3be1';
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const fetch = require('node-fetch');

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

async function fetchData(cityName) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`;

  try {
    const response = await fetch(apiurl);

    if (!response.ok) {
      throw new Error('Network was not okay');
    }

    const data = await response.json();
    const tempInKelvin = data.main.temp;
    const tempInCelsius = kelvinToCelsius(tempInKelvin);

    console.log(`Temperature: ${tempInCelsius.toFixed(2)}°C`);

    // Accessing weather description
    
    const weatherDescription = data.weather[0].description;
    console.log(`Weather Description: ${weatherDescription}`);
    console.log(data.weather[0].icon);
    const long = data.coord.lon;
    const lat = data.coord.lat;
    forecast(lat,long)
  }catch (error) {
      console.error('Error:', error);
    }
  }

  readline.question('Enter the city name:', (cname) => {
    console.log(`The city is: ${cname}...`);
    fetchData(cname); // Call fetchData with the user-input city name
    readline.close();
  });
  


  async function forecast(lat, long) {
    const furl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apikey}`;
    try {
      const response = await fetch(furl);
  
      if (!response.ok) {
        throw new Error('Network was not okay');
      }
  
      const data = await response.json();
      console.log(data);
  
      // Display on the webpage
      updateForecastTable(filteredForecast);
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
/*
const lat="10.7869";
const long="78.9802";

async function forecast(lat,long){
    const furl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apikey}`;
    try {
      const response = await fetch(furl);

      if (!response.ok) {
        throw new Error('Network was not okay');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
}




readline.question('Enter the city name:', (cname) => {
  console.log(`The city is: ${cname}...`);
  fetchData(cname); // Call fetchData with the user-input city name
  readline.close();
});




















const apikey = '59c60baa1d7025787c678a51032d3be1';

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

async function fetchData(cityName) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`;

  try {
    const response = await fetch(apiurl);

    if (!response.ok) {
      throw new Error('Network was not okay');
    }

    const data = await response.json();
    const tempInKelvin = data.main.temp;
    const tempInCelsius = kelvinToCelsius(tempInKelvin);
    const weatherDescription = data.weather[0].description;
    const max = kelvinToCelsius(data.main.temp_max);
    const min = kelvinToCelsius(data.main.temp_min);
    const name = data.name;
    const long=data.coord.lon;
    const lat=data.coord.lat;

    // Get the current date and time
    const { formattedDate, formattedTime } = updateDateTime();
    
    const htmlContent = `
      <p id="time"> ${formattedTime}</p>
      <p id="date"> ${formattedDate}</p>
      <p>${name}</p>
      <p id="temp">${tempInCelsius.toFixed(2)}°C</p>
      <p id="desc">${weatherDescription}</p>
      <p id="max">${max.toFixed(2)}°C</p>
      <p id="min">${min.toFixed(2)}°C</p>
      <p id="lon">${long}</p>
      <p id="lat">${lat}</p>

      
      
    `;

    document.getElementById('weatherData').innerHTML = htmlContent;

  } catch (error) {
    console.error('Error:', error);
  }
}

function fetchWeather() {
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value;

  if (cityName) {
    fetchData(cityName);
  } else {
    alert('Please enter a city name.');
  }
}

function updateDateTime() {
    document.getElementById('dateTime');
  const now = new Date();
  const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  
  const formattedDate = now.toLocaleDateString('en-US', optionsDate);
  const formattedTime = now.toLocaleTimeString('en-US', optionsTime);

 return { formattedDate, formattedTime };
}



forecast(10.7869,78.9802);

async function forecast(lat,lon){
    const furl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;
    try {
      const response = await fetch(furl);
  
      if (!response.ok) {
        throw new Error('Network was not okay');
      }
      const data = await response.json();

      const filteredForecast = data.list.filter(entry => {
        const entryTime = new Date(entry.dt_txt);
      
        return entryTime.getHours() === 15 && entryTime.getMinutes() === 0 && entryTime.getSeconds() === 0;
      });
      
      console.log(filteredForecast);

          
    } catch (error) {
      console.error('Error:', error);
    }
  }
  */
