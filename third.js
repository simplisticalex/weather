import conditions from "./conditions.js";

console.log(conditions);

const form = document.querySelector("#form");
const input = document.querySelector("#input");
const br = document.querySelector('#br');
const apiKey = "868f7c09b97e48d882993602242505";

// Функции для преобразования даты
function formatDateWithMonth(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', day: 'numeric', month: 'long' };
    let formattedDate = date.toLocaleDateString('ru-RU', options);
    
    // Преобразование первой буквы дня недели в заглавную
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    
    // Разделение строки на две части: день недели и дата
    const [weekday, day, month] = formattedDate.split(' ');
    
    return `${weekday}\n${day} ${month}`;
}

function formatDateWithoutMonth(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', day: 'numeric' };
    let formattedDate = date.toLocaleDateString('ru-RU', options);
    
    // Преобразование первой буквы дня недели в заглавную
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    
    // Разделение строки на две части: день недели и день
    const [weekday, day] = formattedDate.split(' ');
    
    return `${weekday}\n${day}`;
}

function formatConditionText(text) {
    return text.trimEnd();
}

function getTemperatureClass(temp) {
    if (temp <= 0) {
        return 'cold';
    } else if (temp <= 15) {
        return 'cool';
    } else if (temp <= 25) {
        return 'warm';
    } else {
        return 'hot';
    }
}

form.onsubmit = function (event) {
    // Отменяем отправку формы
    event.preventDefault();
    const city = input.value.trim(); // обрезаем пробелы

    // Адрес запроса
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;
    // Выполнение запроса на сервер
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);

        const maxTemps = data.forecast.forecastday.map(day => day.day.maxtemp_c);
        const minTemps = data.forecast.forecastday.map(day => day.day.mintemp_c);

        const getImagePath = (dayIndex) => `./pictures/day/${formatConditionText(data.forecast.forecastday[dayIndex].day.condition.text)}.png`;

        const dates = data.forecast.forecastday.map(day => day.date);

        const prevCard = document.querySelector("#article");
        if (prevCard) prevCard.remove();

        let html = `
        <article id="article">
            <div id="flex-container2">
                <div id="chetv">
                    <div class="row top-row">
                        <div class="chetv-inner">${formatDateWithMonth(dates[0])} <img src="${getImagePath(0)}" alt="sunny"></div>
                        <div class="chetv-inner">${formatDateWithoutMonth(dates[1])}<img src="${getImagePath(1)}" alt="sunny"></div>
                        <div class="chetv-inner">${formatDateWithoutMonth(dates[2])}<img src="${getImagePath(2)}" alt="sunny"></div>
                        <div class="chetv-inner">${formatDateWithoutMonth(dates[3])} <img src="${getImagePath(3)}" alt="sunny"></div>
                        <div class="chetv-inner">${formatDateWithoutMonth(dates[4])} <img src="${getImagePath(4)}" alt="sunny"></div>
                        <div class="chetv-inner">${formatDateWithoutMonth(dates[5])}<img src="${getImagePath(5)}" alt="sunny"></div>
                        <div class="chetv-inner">${formatDateWithoutMonth(dates[6])} <img src="${getImagePath(6)}" alt="sunny"></div>
                    </div>
                    <div id="humid">Температура воздуха, °C</div>
                    
                    <div class="row additional-row">
                        ${maxTemps.map(temp => `<div class="chetv-inner">${temp}°C</div>`).join('')}
                    </div>
                    <div class="row bottom-row">
                        ${maxTemps.map(temp => `<div class="chetv-inner ${getTemperatureClass(temp)}" style="color: transparent;">${temp}°C</div>`).join('')}
                    </div>
                    <div class="row additional-row">
                        ${minTemps.map(temp => `<div class="chetv-inner">${temp}°C</div>`).join('')}
                    </div>
                </div>
            </div>
        </article>`;

        br.insertAdjacentHTML("afterend", html);
    }).catch((error) => {
        alert('Ошибка: ' + error.message);
    });
};
