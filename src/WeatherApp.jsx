import { useState } from "react"
import InfoBox from "./InfoBox.jsx"
import SearchBox from "./SearchBox.jsx"
import "./WeatherApp.css"

export default function WeatherApp (){
    let [weatherInfo,setWeatherInfo] = useState({
        city : undefined,
        temp : undefined,
        tempMin : undefined,
        tempMax : undefined,
        humidity : undefined,
        feelsLike : undefined,
        weather : undefined,
    });

    let updateInfo = (newInfo)=>{
        setWeatherInfo(newInfo);
    }

    return (<div style={{textAlign:"center"}}>
        <h1 className="app-name">MeteoMate</h1>
        <SearchBox updateInfo={updateInfo}/>
        <InfoBox info={weatherInfo}/>
    </div>)
}