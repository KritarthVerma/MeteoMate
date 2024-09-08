import TextField from '@mui/material/TextField';
import "./SearchBox.css"
import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchBox({updateInfo,errorHandler}){
    const API_URL = "http://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "2f390f0a47e051f9e871637706ed540a";
    let [city,setCity] = useState("");

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
            let newInfo = await getWeatherInfo();
            setCity("");
            updateInfo(newInfo);
            errorHandler(false)
        } catch(err){
            errorHandler(true);
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
             required
             InputProps={{endAdornment : (
                <IconButton>
                <InputAdornment>
                    <SearchIcon onClick={handleSubmit} sx={{color:'black',opacity:"0.5"}}/>
                </InputAdornment>
                </IconButton>
            ) }}
            sx={{
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                    borderColor: "none",
                    borderWidth:0,
                    },
                    "&:hover":{
                        boxShadow:"0px 0px 1px rgb(10,10,10)"
                    },
                    '&.Mui-focused': {
                        boxShadow: 'none',
                    },
                },
            }}
            InputLabelProps={{
                sx: {
                color: 'black',
                opacity:"0.5"
                },
            }}/>
            <br />
            <br />
        </form>
        </div>
    );
}