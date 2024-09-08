import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./InfoBox.css"
import ThunderstormIcon from "@mui/icons-material/Thunderstorm"
import AcUnitIcon from "@mui/icons-material/AcUnit"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import { CardMedia } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export default function InfoBox({info,notFound}){
    return (<div className="InfoBox">
        <div className='cardContainer'>
            <Card sx={{ 
                background:  'rgba(225,225,225,0.18)',
                boxShadow:  '0 8px 32px 0 rgba(31,38,135,0.37)',
                backdropFilter: 'blur(8px)',
                webkitBackdropFilter: 'blur(8px)',
                borderRadius: '10px',
                border: '1px solid rgba(225,225,225,0.18)',
                height:'250px',
                maxWidth: 345,
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                position:'relative',
                padding:'0',
                 }}>
                    {notFound && (<><ErrorOutlineOutlinedIcon 
                        sx={{fontSize:'50px',
                            opacity:'0.6',
                            color:'#d3d3d3',
                            marginBottom:'20px'}}/>
                    <Typography sx={{width:'75%',color:'#D3D3D3'}}>
                        Oops! Looks like you entered a invalid location.
                    </Typography></>)}
                    {(!notFound && !info.city) && ( <><CardMedia 
                    component="img"
                    image="../Images/WeatherIcons.gif"
                    sx={{margin:'0 auto',
                        objectFit:'contain',
                        height:'60%',
                        width:'70%',
                        marginBottom:'10px',
                        marginTop:'0',
                    }}/> <Typography sx={{color:'#D3D3D3'}}>
                        Please enter a location to get weather information!
                        </Typography></>)}
                {(!notFound && info.city) && <CardContent className="custom-scrollbar" sx={{overflowY:'auto'}}>
                    <Typography gutterBottom variant="h5" component="div" sx={{marginTop:'7px',color:'white'}}>
                    {info.city} {info.humidity > 80 ? <ThunderstormIcon sx={{color:'#abdbe3'}}/> : 
                    info.temp > 16 ? <WbSunnyIcon sx={{color:'#e2a783'}}/> : <AcUnitIcon sx={{color:'#abdbe3'}}/>}
                    </Typography>
                    <Typography variant="body2" sx={{fontSize:'1.15rem', color: '#d3d3d3' }} component={"span"}>
                    <div>Temperature - {info.temp}&deg;C</div>
                    <div>Humidity - {info.humidity}</div>
                    <div>Min - {info.tempMin}&deg;C</div>
                    <div>Max - {info.tempMax}&deg;C</div>
                    <div>The weather can be described as - <i>{info.weather}</i> and feels like {info.feelsLike}&deg;C</div>
                    </Typography>
                </CardContent>}
            </Card>
        </div>
    </div>)
}