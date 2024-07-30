import React, { useEffect, useState } from "react";
import './Styles.css'

/*images*/
import ClearIcon from './Assests/clear.jpeg'
import CloudIcon from './Assests/cloud.png'
import DrizzleIcon from './Assests/drizzle.jpeg'
import HumidityIcon from './Assests/humidity.png'
import RainIcon  from './Assests/rain.png'
import Searchicon from './Assests/search.png'
import SnowIcon from './Assests/snow.png'
import WindIcon from './Assests/wind.png'
import Scatteredclouds from './Assests/scatteredclouds.png'
import brokenclouds from './Assests/brokenclouds.png'
import thunderstorm from './Assests/thunder.png'
import mist from './Assests/mist.png'



function WeatherDetails({icon, temp , city ,country, lat, log, humidity, wind}){

    return(
        <>
        <div className="image">
            <img src={icon} alt="Clear" />
        </div>
        <div className="temp"> {temp}°C</div>
        <div className="location">
                {city}
        </div>
        <div className="country">
            {country}
        </div>
        <div className="cord">
            <div>
                <span className="lat"> Latitude</span>
                <span>{lat}</span>
            </div>

                <div>
                <span className="lag"> Logitude</span>

                <span>{log}</span>
            </div>
        </div>
        <div className="data-container">
            <div className="element">
                <img src={HumidityIcon} alt="Humidity" className="icon" />
            <div className="data">
                <div className="Humidity-percent">
                   {humidity} %
                </div>
                <div className="text">Humidity</div>
            </div>
            </div>
            <div className="element">
                <img src={WindIcon} alt="wind" className="icon" />
            <div className="data">
                <div className="wind-percent">
                   {wind} km/h
                </div>
                <div className="text">Wind Speed</div>
            </div>
            </div>
        </div>
        </>
    )
}


function WeatherApp(){
    const[Cityname,setCityname]=useState("chennai")
    const[Icon,setIcon]=useState(SnowIcon)
    const[Temp,setTemp]=useState(0)
    const[City,setCity]=useState('')
    const[Country,setCountry]=useState("")
    const[Lat,setLat]=useState(0)
    const[Log,setLog]=useState(0)
    const[Humidity,setHumidity]=useState(0)
    const[Wind,setWind]=useState(0)
    const[citynotfound,setcitynotfound]=useState(false)
    const[loading,setloading]=useState(false)
    const Weathericonmap={
        "01d":ClearIcon,
        "01n": ClearIcon,
        "02d": CloudIcon,
        "02n":CloudIcon,
        "03d":  Scatteredclouds,
        "03n": Scatteredclouds,
        "04d": brokenclouds,
        "04n": brokenclouds,
        "09d": DrizzleIcon,
        "09n": DrizzleIcon,
        "010d": RainIcon,
        "010n": RainIcon,
        "11d": thunderstorm,
        "11n": thunderstorm,
        "013d": SnowIcon,
        "013n": SnowIcon,
        "50d": mist,
        "50n":mist

    }
    const[error,seterror]=useState(null)

    const search= async()=>{
        setloading(true)
    let api_key="75e7b64cf8c955a27c1f9c56e55f8d42"

        let url=`https://api.openweathermap.org/data/2.5/weather?q=${Cityname}&appid=${api_key}&&units=metric`
        
        try{
            let res= await fetch(url)
            let data= await res.json()
            console.log(data)
            if(data.cod==="404"){
                console.error("City Not Found")
                setcitynotfound(true)
                setloading(false)
                return
            }
            
            setHumidity(data.main.humidity);
            setWind(data.wind.speed)
            setTemp( Math.floor(data.main.temp))
            setCity(data.name)
            setCountry(data.sys.country)
            setLat(data.coord.lat)
            setLog(data.coord.lon)
            const weatherIconCode= data.weather[0].icon;
            setIcon(Weathericonmap[weatherIconCode] || ClearIcon)
            setcitynotfound(false)
            
        }
        catch(error){
            // console.error("An error accured:", error.message)
           if(Cityname==""){
            seterror("An Error Occurred While Fetching Data.")
        
           }
        }
        finally{
            setloading(false)
        }
    
    
    }
    function handleCity(e){


        setCityname(e.target.value)
    }
    function handleKeyDown(e){
        if(e.key ==="Enter")
            {
                search()
            }

    }
   useEffect(function(){
     search()
   }, [])
    return(
        <>
        <div className="container">
            <div className="input-container">
                <input type="text" value={Cityname} onKeyDown={handleKeyDown} className="cityinput" placeholder="Search City" onChange={handleCity} />
                <div className="search-icon" onClick={()=>search()}>
                    <img  src={Searchicon} alt="Search icon"  />
                </div>
     
            </div>
           {loading && <div className="loading-message">
            loading...
        </div>}
       {error && <div className="error-message">
            {error}
        </div> }
       {citynotfound && <div className="city-not-found">
            City Not Found
        </div> }
    { !loading && !citynotfound &&  <WeatherDetails icon={Icon}
         temp={Temp}
          city={City} 
          country={Country}
           lat={Lat} log={Log} 
           humidity={Humidity} 
           wind={Wind} />
    }
        
        </div>
      
        </>
    )
}

export default WeatherApp