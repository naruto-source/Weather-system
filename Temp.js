// https://api.openweathermap.org/data/2.5/weather?q=Wardha&appid=28e35939434e84dea86861b2e128a2cf
import React, { useEffect, useState } from 'react'
import WeatherCard from './WeatherCard';
import "./style.css"
const Temp = () => {
    const [searchValue, setSearchValue] = useState("Wardha");
    const [tempInfo, setTempInfo] = useState({});
    const getWeatherInfo = async () =>{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=28e35939434e84dea86861b2e128a2cf`;
            const res = await fetch(url);
            const data = await res.json();
            const {temp, humidity, pressure} = data.main;
            // console.log(humidity)
            const {main : weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.main;
            const {country , sunset} = data.sys;

            const myNewWeatherInfo ={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            };
            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect (() =>{
         getWeatherInfo();
    }, [])
  return (
    <>
    <div className='wrap'>
        <div className='search'>
            <input type='search' 
            placeholder='search...' 
            autoFocus id='search' 
            className='searchTerm' value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></input>
            <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
    </div>
    <WeatherCard tempInfo = {tempInfo}></WeatherCard>
    </>
  )
}

export default Temp
