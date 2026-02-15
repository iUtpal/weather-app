document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input')
    const getWeatherBtn = document.getElementById('get-weather-btn')
    const weatherInfo = document.getElementById('weather-info')
    const cityName = document.getElementById('cityName')
    const weather = document.getElementById('weather')
    const condition = document.getElementById('condition')
    const desc = document.getElementById('desc')
    const errorMessage = document.getElementById('error-message')

    const API_KEY = `WNKXUXKD8X5CU8FKUWQUPYTKH`

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        try {
            const weatherData = await fetchDetails(city)
            displayDetails(weatherData)

        } catch (error) {
            showError()
        }

    })

    cityInput.addEventListener('keypress',(e)=>{
        if(e.key==='Enter')
            getWeatherBtn.click();
    })

    async function fetchDetails(city) {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${API_KEY}`
        const response = await fetch(url)

        if (!response.ok)
            throw new error('City not found')

        const data = await response.json()
        return data
    }

    function displayDetails(weatherData) {
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')

        console.log(weatherData);

        const degreeSymbol = '\u00B0';

        const { resolvedAddress, currentConditions, description } = weatherData
        cityName.textContent = resolvedAddress
        weather.textContent = `${((Number(currentConditions.temp) -32) / (9/5)).toFixed(1)} ${degreeSymbol} C`
        condition.textContent = `${currentConditions.conditions}`
        desc.textContent = `Description: ${description}`

    }

    function showError() {
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
})