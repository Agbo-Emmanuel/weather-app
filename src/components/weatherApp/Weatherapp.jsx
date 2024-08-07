import React, { useState } from 'react'
import "./weatherapp.css"
import searchicon from "../image/search.png"
import clearicon from "../image/clear.png"
import cloudicon from "../image/cloud.png"
import drizzleicon from "../image/drizzle.png"
import humidityicon from "../image/humidity.jpeg"
import rainicon from "../image/rain.png"
import snowicon from "../image/snow.jpeg"
import windicon from "../image/wind.png"

const Weatherapp = () => {

    const apiKey = "598a74c8ff9e8d209560e13ff535c5d0";

    const [wicon, setWicon] = useState(cloudicon)
    const [weather, setWeather] = useState(null)

    const search = async () => {
       const element = document.getElementsByClassName("cityInput")
       if (element[0].value===""){
        return 0;
       }

       let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`

       let response = await fetch(url);
       let data = await response .json();

       const humidity = document.getElementsByClassName("humidity-percent")
       const wind = document.getElementsByClassName("wind-rate")
       const temperature = document.getElementsByClassName("weather-temp")
       const location = document.getElementsByClassName("weather-location")

       humidity[0].innerHTML = data.main.humidity + "%";
       wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
       temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
       location[0].innerHTML = data.name;

       if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
        setWicon(clearicon)
       }
       else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
        setWicon(cloudicon)
       }
       else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
        setWicon(drizzleicon)
       }
       else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
        setWicon(drizzleicon)
       }
       else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
        setWicon(rainicon)
       }
       else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
        setWicon(rainicon)
       }
       else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
        setWicon(snowicon)
       }
       else{
        setWicon(clearicon)
       }

    }

  return (
    <div className='container'>
      <div className="top-bar">
            <input type="text" className="cityInput" placeholder='search'/>
            <div className="search-icon"onClick={()=>{search()}}>
                <img src={searchicon} alt="" />
            </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
            <img src={humidityicon} alt="" className="icon" />
            <div className="data">
                <div className="humidity-percent">64%</div>
                <div className="text">Humidity</div>
            </div>
        </div>
        <div className="element">
            <img src={windicon} alt="" className="icon" />
            <div className="data">
                <div className="wind-rate">18 km/h</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Weatherapp
