import conditions from "./conditions.js";


console.log(conditions);

    const form = document.querySelector("#form");
    const input = document.querySelector("#input");
    const br = document.querySelector('#br');
    const apiKey = "868f7c09b97e48d882993602242505";

    // Функция для преобразования даты
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'short', day: 'numeric', month: 'long' };
        let formattedDate = date.toLocaleDateString('ru-RU', options);
        
        // Преобразование первой буквы дня недели в заглавную
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        
        return formattedDate;
    }

    function formatConditionText(text) {
        return text.trimEnd();
    }
    form.onsubmit = function (event) {
        // Отменяем отправку формы
        event.preventDefault();
        const city = input.value.trim(); // обрезаем пробелы

        // Адрес запроса
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;
        // Выполнение запроса на сервер
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            //принимает один аргумент object, представляющий текущий элемент массива conditions, и проверяет, равен ли object.code значению переменной code.
            const info = conditions.find((object) => object.code === data.current.condition.code)
            const info2 = conditions.find((object) => object.code === data.forecast.forecastday[0].day.condition.code)  
            const info3 = conditions.find((object) => object.code === data.forecast.forecastday[1].day.condition.code )    
            
            const timeCondition = data.current.is_day ? info.languages[23]["day_text"] : info.languages[23]["night_text"];

            const filePath = './pictures/' + (data.current.is_day ? 'day' : 'night') + '/';
            const fileName = (data.current.is_day ? info.day : info.night) + '.png';
            const imgPath = filePath + fileName;

        const imgPath2 = './pictures/day/' + formatConditionText(data.forecast.forecastday[0].day.condition.text) + '.png';
        const imgPath3 = './pictures/day/' + formatConditionText(data.forecast.forecastday[1].day.condition.text) + '.png';

        const smallImgPath = './pictures/' + (data.forecast.forecastday[0].hour[0].is_day ? 'day' : 'night') + '/' + formatConditionText(data.forecast.forecastday[0].hour[0].condition.text) + '.png';
        const smallImgPath2 = './pictures/' + (data.forecast.forecastday[0].hour[3].is_day ? 'day' : 'night') + '/' + formatConditionText(data.forecast.forecastday[0].hour[3].condition.text) + '.png';
        const smallImgPath3 = './pictures/' + (data.forecast.forecastday[0].hour[6].is_day ? 'day' : 'night') + '/' + formatConditionText(data.forecast.forecastday[0].hour[6].condition.text) + '.png';
        const smallImgPath4 = './pictures/' + (data.forecast.forecastday[0].hour[9].is_day ? 'day' : 'night') + '/' + formatConditionText(data.forecast.forecastday[0].hour[9].condition.text) + '.png';
        const smallImgPath5 = './pictures/' + (data.forecast.forecastday[0].hour[12].is_day ? 'day' : 'night') + '/' + formatConditionText(data.forecast.forecastday[0].hour[12].condition.text) + '.png';
        const smallImgPath6 = './pictures/' + (data.forecast.forecastday[0].hour[15].is_day ? 'day' : 'night') + '/' + formatConditionText(data.forecast.forecastday[0].hour[15].condition.text) + '.png';
        const smallImgPath7 = './pictures/' + (data.forecast.forecastday[0].hour[18].is_day ? 'day' : 'night') + '/' + formatConditionText(data.forecast.forecastday[0].hour[18].condition.text) + '.png';
        const smallImgPath8 = './pictures/' + (data.forecast.forecastday[0].hour[21].is_day ? 'day' : 'night') + '/' + formatConditionText(data.forecast.forecastday[0].hour[21].condition.text) + '.png';

            const prevCard = document.querySelector("#article");
            if(prevCard) prevCard.remove();
            
        const html = 
        `<article id="article">
        <div id="flex-container">
             <div id="perviy">
                 <div class="card">
                     <div class="card-time">Сейчас</div>
                     <div class="card-temp">${data.current.temp_c}°C</div>
                     <div class="card-weather">${timeCondition}</div>
                 </div>
                 <img id="weather-icon" src="${imgPath}" alt="sunny">
             </div>
             <div id="vtoroy">
                 <div class="card">
                     <div class="card-time2">${formatDate(data.forecast.forecastday[0].date)}</div>
                     <div class="card-temp">${data.forecast.forecastday[0].day.maxtemp_c}°C</div>
                     <div class="card-weather">${info2.languages[23]["day_text"]}</div>
                 </div>
                 <img id="weather-icon" src="${imgPath2}" alt="sunny">
             </div>
             <div id="tretiy">
                 <div class="card">
                     <div class="card-time">${formatDate(data.forecast.forecastday[1].date)}</div>
                     <div class="card-temp">${data.forecast.forecastday[1].day.maxtemp_c}°C</div>
                     <div class="card-weather">${info3.languages[23]["day_text"]}</div>
                 </div>
                 <img id="weather-icon" src="${imgPath3}" alt="sunny">
             </div>
         </div>
         <div id="flex-container2">
             <div id="chetv">
                 <div class="row top-row">
                     <div class="chetv-inner"><img src="${smallImgPath}" alt="sunny"> 0.00</div>
                     <div class="chetv-inner"><img src="${smallImgPath2}" alt="sunny"> 3.00</div>
                     <div class="chetv-inner"><img src="${smallImgPath3}" alt="sunny"> 6.00</div>
                     <div class="chetv-inner"><img src="${smallImgPath4}" alt="sunny"> 9.00</div>
                     <div class="chetv-inner"><img src="${smallImgPath5}" alt="sunny"> 12.00</div>
                     <div class="chetv-inner"><img src="${smallImgPath6}" alt="sunny"> 15.00</div>
                     <div class="chetv-inner"><img src="${smallImgPath7}" alt="sunny"> 18.00</div>
                     <div class="chetv-inner"><img src="${smallImgPath8}" alt="sunny"> 21.00</div>
                 </div>
                 <div id="humid">Отноительная влажность, %</div>
                 
                 <div class="row bottom-row">
                     <div class="chetv-inner" >${data.forecast.forecastday[0].hour[0].humidity}</div>
                     <div class="chetv-inner" >${data.forecast.forecastday[0].hour[3].humidity}</div>
                     <div class="chetv-inner" >${data.forecast.forecastday[0].hour[6].humidity}</div>
                     <div class="chetv-inner" >${data.forecast.forecastday[0].hour[9].humidity}</div>
                     <div class="chetv-inner" >${data.forecast.forecastday[0].hour[12].humidity}</div>
                     <div class="chetv-inner" >${data.forecast.forecastday[0].hour[15].humidity}</div>
                     <div class="chetv-inner" >${data.forecast.forecastday[0].hour[18].humidity}</div>
                     <div class="chetv-inner" >${data.forecast.forecastday[0].hour[21].humidity}</div>
                 </div>
             </div>
         </div>
         </article>`;

    br.insertAdjacentHTML("afterend", html);

            
            

        }).catch((error) => {
            alert('Ошибка: ' + error.message);
        });

    };

       
