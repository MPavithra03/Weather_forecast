const apikey = '59c60baa1d7025787c678a51032d3be1';
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;
    
    if (cityName) {
      fetchWeather(cityName);
    } else {
      alert('Please enter a city name.');
    }
  }
}

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
    const name = data.name;
    const lon=data.coord.lon;
    const lat=data.coord.lat;
    const bicon = data.weather[0].icon;

    const { formattedDate, formattedTime } = unixTimestampToDateTime(data.dt);
    
    const htmlContent = `
       <p id="temp">${tempInCelsius.toFixed(0)}°C</p>
       <p id="cname">${name}</p>
       <p id="time"> ${formattedTime}</p>
       <p id="date"> ${formattedDate}</p>
       <p id="desc">${weatherDescription}</p>
 `;
     
    icon(bicon);
    document.getElementById('weatherData').innerHTML = htmlContent;
    forecast(lat,lon);

  } catch (error) {
    console.error('Error:', error);
  }
}

function fetchWeather() {
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value;


  if (cityName) {
    fetchData(cityName);
    
    cityInput.value='';
  } else {
    alert('Please enter a city name.');
  }
}

function unixTimestampToDateTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  const options = { month: 'long', day: 'numeric'};
  const time ={ hour: 'numeric', minute: 'numeric'};
 const formattedDate= date.toLocaleTimeString('en-US',time);
  const formattedTime = date.toLocaleDateString('en-US',options);
  return{formattedDate, formattedTime };
}

 function icon(bicon){
  const imgpath= `icon/${bicon}.png`;
    const icon1= document.getElementById('bicon');
    const imgelement=document.createElement('img');
    imgelement.id='icon1';
    imgelement.src=imgpath;
    imgelement.alt='weather icon';
    icon1.innerHTML='';
    icon1.appendChild(imgelement);
 }

function updateForecastOnPage(filteredForecast) {
  const forecastDataElement = document.getElementById('forecastData');
  forecastDataElement.innerHTML = '';
  
  // Iterate through the filtered forecast and update HTML
  filteredForecast.forEach(entry => {
    const { date, temperature } = entry;
    const forecastItem = document.createElement('p');
    const tempInCelsius=kelvinToCelsius(temperature)
    forecastItem.textContent = `Date: ${date.split(' ')[0]}, Temperature: ${tempInCelsius.toFixed(2)}°C`;
    forecastDataElement.appendChild(forecastItem);
  });
}

const tim=document.getElementById('time');
console.log(tim);

async function forecast(lat, lon) {
  const furl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;
  try {
    const response = await fetch(furl);

    if (!response.ok) {
      throw new Error('Network was not okay');
    }

    const data = await response.json();
  
    const iconValues = data.list.map(entry => entry.weather[0].icon);
    
  
    const filteredForecast = data.list
    .filter(entry => entry.dt_txt.includes('06:00:00'))
      .map(entry => ({ date: entry.dt_txt, temperature: entry.main.temp ,icon:entry.weather[0].icon}));

      updateForecastTable(filteredForecast);
} catch (error) {
    console.error('Error:', error);
  }
}

function updateForecastTable(filteredForecast) {
  
  const bigdiv = document.getElementById('forecastData');
  bigdiv.innerHTML='';

  filteredForecast.forEach(entry => {
    const { date, temperature, icon } = entry;

    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const smalldiv = document.createElement('div');
    smalldiv.id='sdiv';
    
    const p1=document.createElement('p');
    p1.append(formattedDate);
    smalldiv.append(p1);
    
    const tempInCelsius = kelvinToCelsius(temperature);
    const temper= tempInCelsius.toFixed(0) + '°C';
    const p2=document.createElement('p');
    p2.append(temper);
    smalldiv.append(p2);

    const iconImagePath = `icon/${icon}.png`;
    const iconImage = document.createElement('img');
    iconImage.id='simg';
    
    iconImage.src = iconImagePath;
    iconImage.alt = 'weather icon';
    console.log(smalldiv);
    smalldiv.append(iconImage);
    bigdiv.append(smalldiv);
    console.log(bigdiv);
  });
}
