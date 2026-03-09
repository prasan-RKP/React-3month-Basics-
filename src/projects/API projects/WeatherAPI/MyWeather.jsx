import React, { useState } from 'react'
//import "../stylesheets/weat.css";

const MyWeather = () => {

    let [loading, setLoading] = useState(false);
    let [city, setCity] = useState('');

    let [humidity, setHumidity] = useState('');
    let [windSpeed, setWindSpeed] = useState('');
    let [temp, setTemp] = useState('');
    let [cityName, setCityName] = useState('');


    const apiKey = "67e23474d5b4b3c308e91369cc78675e";
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";



    const checkWeatherDetail = async (cityName) => {
        setLoading(true);
        try {
            let response = await fetch(apiURL + cityName + `&appid=${apiKey}`);

            if (response.status === 404) {
                alert("City Not Found");
                setLoading(false);
                setCity("");
                setCityName("");
                setHumidity("");
                setTemp("");
                setWindSpeed("");
                return;
            }

            let data = await response.json();
            setHumidity(data?.main?.humidity);
            setWindSpeed(data?.wind?.speed);
            setTemp(Math.round(data?.main?.temp));
            setCityName(data?.name);
            setCity("");
        } catch (error) {
            console.log('Error inside the Method', error);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }

    console.log("Hello", loading);
    console.log("City", city);
    //console.log("Data", data);

    return (
        <div className="body">
            <div className="container">

                <div className="top-section">
                    <input onChange={(e) => setCity(e.target.value)} type="text" id="searchBox" placeholder="Enter your city" spellcheck="false" />

                    {loading ? (
                        <div className="loader"></div>
                    ) : (
                        <button onClick={() => checkWeatherDetail(city)} id="btn">
                            <img src="/images/search.png" alt="search" className="searchIcon" />
                        </button>
                    )}

                </div>

                {cityName ? (<> <div className="weather">

                    <div className="mid-section">

                        <div className="image">
                            <img src="images/drizzle.png" className="weather-icon" />
                        </div>

                        <div className="text">
                            <h1 className="temp">{temp ? `${temp}°c` : "0°c"}  </h1>
                            <h2 className="place">{cityName}</h2>
                        </div>
                    </div>

                    <div className="last-section">

                        <div className="last1">
                            <img src="images/humidity.png" />

                            <div className="para1">
                                <p className="humidity">{humidity ? `${humidity}%` : "0.00"}</p>
                                <p className="text1">Humidity</p>
                            </div>
                        </div>


                        <div className="last2">
                            <img src="images/wind.png" />

                            <div className="para2">
                                <p className="windSpeed">{windSpeed ? windSpeed : "0.00"}</p>
                                <p className="text2">wind speed</p>
                            </div>
                        </div>


                    </div>
                </div></>) : (<> <div className="error">
                    <p>Invalid City Name</p>
                </div></>)}
            </div>
        </div>
    )
}

export default MyWeather