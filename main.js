let inputValue = document.getElementById('search_input');
let btnInput = document.getElementById('btn');
const contryBox = document.querySelector('.country-box');
const addBox = document.querySelector('.additional-box');

const body = document.getElementById('body');
const sunny = document.getElementById('sunny');
const moon = document.getElementById('moon');
const rain = document.getElementById('rain');
const snow = document.getElementById('snow');

window.addEventListener('load', ()=>{

    btnInput.addEventListener('click', (e)=>{
        e.preventDefault();
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&units=metric&appid=33dedde6287575d237be2e1c44271762`;
        
        fetch(url).then((res) => res.json()).then((data)=>{
            console.log(data);
            contryBox.innerHTML = `
                <p class="mb-1">Country: ${data.sys.country}<p>
                <h1 class="mb-1 camel-case">${data.name}</h1>
                <h2 class="mb-1"><span>${Math.ceil(data.main.temp)}</span>	&deg;C</h2>
                <h2 class="mb-1"><span>${data.weather[0].main} </span><i id="icon-indicator" class='bx bx-sun'></i></h2>
            `;
            addBox.innerHTML = `
                <p class="mb-1">Humidity: <span>${data.main.humidity}</span>%</p>
                <p>Wind Speed: <span>${data.wind.speed} </span>km/h</p>
            `;
            let showIcon = document.querySelector('#icon-indicator');
        
            switch (data.weather[0].main) {
                case "Clouds":
                    showIcon.className = "bx bx-cloud";
                    sunny.classList.add('d-none');
                    moon.classList.add('d-none');
                    rain.classList.add('d-none');
                    snow.classList.remove('d-none');
                    body.style.background = "var(--bg-could)";
                    break;
                case "Rain":
                    showIcon.className = "bx bx-cloud-rain"
                    sunny.classList.add('d-none');
                    moon.classList.add('d-none');
                    rain.classList.remove('d-none');
                    snow.classList.add('d-none');
                    body.style.background = "var(--bg-rain)";
                    break;
                case "Clear": 
                    showIcon.className = "bx bx-sun"
                    sunny.classList.remove('d-none');
                    moon.classList.add('d-none');
                    rain.classList.add('d-none');
                    snow.classList.add('d-none');
                    body.style.background = "var(--bg-primary)";
                    break;
                case "Snow": 
                    showIcon.className = "bx bx-cloud-snow"
                    sunny.classList.add('d-none');
                    moon.classList.add('d-none');
                    rain.classList.add('d-none');
                    snow.classList.remove('d-none');
                    body.style.background = "var(--bg-could)";
                    break;
            }
            if(new Date().getHours() > 20){
                body.style.background = "var(--bg-night)";
                sunny.classList.add('d-none');
                moon.classList.remove('d-none');
                rain.classList.add('d-none');
                snow.classList.add('d-none');
            }else{
                showIcon.className = "bx bx-sun"
                sunny.classList.remove('d-none');
                moon.classList.add('d-none');
                rain.classList.add('d-none');
                snow.classList.add('d-none');
                body.style.background = "var(--bg-primary)";
            }
        }).catch(err => alert("Wrong city and country name!"));  
    });
})






