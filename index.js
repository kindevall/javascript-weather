window.addEventListener('load', (event) => {
  const spinner = document.getElementById('spinner')

  // Shows the loading spinner during HTTP fetch
  const showSpinner = () => {
    spinner.classList.add('show')
  }
  // Hides the loading spinner
  const hideSpinner = () => {
    spinner.classList.remove('show')
  }

  // Uses the icon value/id found in the Weather API json file to determine the correct icon to use
  const setIcon = (weatherID) => {
    const icon = document.querySelector('img')
    icon.src = `./weather_icons/${weatherID}@2x.png`

    const weather = document.getElementById('icon')
    weather.appendChild(icon)
  }

  showSpinner()

  // Uses the OpenWeather Weather API to get the current weather of user's location
  // You can get an API key from https://openweathermap.org/appid
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude
    const longtitude = position.coords.longitude
    const api = 'https://api.openweathermap.org/data/2.5/weather?lat=' +
      latitude +
      '&lon=' +
      longtitude +
      // API key here
      '&APPID=<API key>'

    fetch(api)
      .then((httpResponse) => { return httpResponse.json() })
      .then((jsonObject) => {
        const h2 = document.querySelector('#city')
        h2.innerHTML = jsonObject.name

        const p = document.querySelector('#weather')
        // The weather value from the API is in kelvins, conversion to celsius:
        p.innerHTML = (jsonObject.main.temp - 273.15).toFixed(1) + ' °C '
        setIcon(jsonObject.weather[0].icon)
      })

    hideSpinner()
  })
})
