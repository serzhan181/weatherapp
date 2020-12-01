const { default: Axios } = require('axios')
const { err } = require('./err')

const pageEl = document.querySelector('.page')
const cityEl = document.querySelector('.weather-city')
const conditionImg = document.querySelector('.weather-img')
const conditionTextEl = document.querySelector('.weather-condition')
const temperatureEl = document.querySelector('.weather-temperature')
const searchInputEl = document.querySelector('.search-input')
const searchBtnEl = document.querySelector('.search-button')

let searchText = ''

const conditionImages = {
  sunny: '<i class="fas fa-cloud-sun weather-img-color"></i>',
  cloudy: '<i class="fas fa-cloud weather-img-color"></i>',
  rain: '<i class="fas fa-cloud-showers-heavy weather-img-color"></i>',
  overcast: '<i class="fas fa-cloud-sun-rain weather-img-color"></i>',
}

function minimizeRequest(data) {
  const conditionText = data.current.condition.text
  const { temp_c } = data.current
  const city = data.location.name

  return { conditionText, temp_c, city }
}

function setConditionImg(condition) {
  let res = ''
  switch (condition) {
    case 'Sunny':
      res = conditionImages.sunny
      break
    case 'Partly cloudy':
      res = conditionImages.cloudy
      break
    case 'Rain':
      res = conditionImages.rain
      break
    case 'Overcast':
      res = conditionImages.overcast
      break

    default:
      res = conditionImages.cloudy
      break
  }

  return res
}

function setAllData(req) {
  cityEl.textContent = req.city
  conditionImg.innerHTML = setConditionImg(req.conditionText)
  conditionTextEl.textContent = req.conditionText
  temperatureEl.textContent = `${req.temp_c} C`
}

function request(city) {
  return Axios.get(
    `http://api.weatherapi.com/v1/current.json?key=31a8601f502f43178ac123138202911&q=${city}`
  )
}

window.addEventListener('DOMContentLoaded', () => {
  searchInputEl.addEventListener('input', (e) => {
    searchText = e.target.value
  })

  searchBtnEl.addEventListener('click', () => {
    request(searchText)
      .then((res) => {
        const req = minimizeRequest(res.data)
        setAllData(req)
      })
      .catch(() => {
        return (pageEl.innerHTML = err)
      })
  })
})
