
        const apiKey = "24868e55e03ff0105ef3043a80e9a6b1";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");
    
        async function checkWeather(city) {
            try {
                const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
                
                if (response.status === 404) {
                    document.querySelector(".error").style.display = "block";
                    document.querySelector(".weather").style.display = "none";
                    return;  // Exit the function early
                }
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
                
                const weatherCondition = data.weather[0].main.toLowerCase();
                if (weatherCondition === "clouds") {
                    weatherIcon.src = "images/clouds.png";
                } else if (weatherCondition === "clear") {
                    weatherIcon.src = "images/clear.png";
                } else if (weatherCondition === "rain") {
                    weatherIcon.src = "images/rain.png";
                } else if (weatherCondition === "drizzle") {
                    weatherIcon.src = "images/drizzle.png";
                } else if (weatherCondition === "mist") {
                    weatherIcon.src = "images/mist.png";
                }
    
                document.querySelector(".weather").style.display = "block";
                document.querySelector(".error").style.display = "none";
    
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
    
        searchBtn.addEventListener("click", () => {
            checkWeather(searchBox.value);
        });
    
    