const form = document.querySelector('#form');
const search = document.querySelector('#search');
const display = document.querySelector('.display');
const h2 = document.querySelector('.h2');
const h1 = document.querySelector('.h1');
const API_KEY = `a4ecd133a3ae2d2ba9748541e0c5dab2`;


const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return showWeather(data);
}


const showWeather = (data) => {
    if (data.cod == '404') {
        display.innerHTML = `<span>${data.message}</span>`;
        return;
    }

    h2.textContent = search.value.toUpperCase();
    display.innerHTML = ` 
    
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather image">
                <span>${data.main.temp} °C</span>
        `;
    h1.textContent = `${data.weather[0].main}`;
    search.value = ''
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    getWeather(search.value);

})