import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';

export default function SearchBox({updateInfo}){
    const API_URL = "http://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "2f390f0a47e051f9e871637706ed540a";
    let [city,setCity] = useState("");
    let [error,setError] = useState(false);

    function capitalizeWords(str) {
        return str
            .split(' ')
            .map(word => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        }

    let getWeatherInfo = async ()=>{
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            let result = {
                city : capitalizeWords(city),
                temp : jsonResponse.main.temp,
                tempMin : jsonResponse.main.temp_min,
                tempMax : jsonResponse.main.temp_max,
                humidity : jsonResponse.main.humidity,
                feelsLike : jsonResponse.main.feels_like,
                weather : jsonResponse.weather[0].description,
            };
        return result;
        } catch (err) {
            throw err;
        }
    }

    let handleChange = (event)=>{
        setCity(event.target.value)
    }
    
    let handleSubmit = async (event)=>{
        try {
            event.preventDefault();
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setError(false);
        } catch(err){
            setError(true);
        }
    }

    return (
        <div className='SearchBox'>
        <form onSubmit={handleSubmit}>
            <TextField
             id="city" 
             label="City Name" 
             variant="outlined" 
             value = {city}
             onChange={handleChange}
             required/>
            <br />
            <br />
            <Button 
             variant="contained" 
             type="submit">
                Search
            </Button>
        </form>
        {error && <p style={{color:"red"}}>No such place exists</p>}
        </div>
    );
}