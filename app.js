window.addEventListener('load', () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  const temperatureDegree = document.querySelector('.temperature-degree');
  const locationTimezone = document.querySelector('.location-timezone');
  const temperatureSection = document.querySelector('.degree-section');
  const temperatureSpan = document.querySelector('.degree-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // API is not working because of too many requests right now.
      // const proxy = "https://cors-anywhere.herokuapp.com/";
      // const api = `${proxy}https://api.darksky.net/forecast/a4e0084ab49a48d5b3905ae5a085890c/${lat},${long}`;
      const api = 'http://localhost:3000/exampleResponse';

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log('data: ', data);
          const { temperature, summary, icon } = data.currently;
          // Set DOM Elements from the api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          let celsius = (temperature - 32) * (5 / 9);

          // Set Icon
          setIcons(icon, document.querySelector('.icon'));

          // Change temperature to Celsius / Fahrenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  // convert celcius to fahrenheit and vice versa

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
