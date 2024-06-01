import React, { useState, useEffect } from 'react';
import Permission from './Permission.jsx';
import WeatherIcons from 'react-animated-weather';
const apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;

const weatherMapping = {
  'Clear': {
    day: 'CLEAR_DAY',
    night: 'CLEAR_NIGHT',
  },
  'Clouds': 'CLOUDY',
  'Haze': 'FOG',
  'Rain': 'RAIN',
  'Drizzle': 'RAIN',
  'Thunderstorm': 'RAIN',
  'Snow': 'SNOW',
  'Mist': 'FOG',
  'Smoke': 'FOG',
  'Dust': 'WIND',
  'Fog': 'FOG',
  'Sand': 'WIND',
  'Ash': 'FOG',
  'Squall': 'WIND',
  'Tornado': 'WIND'
};

const getWeatherIcon = (main, description) => {
  if (weatherMapping[main]) {
    if (typeof weatherMapping[main] === 'string') {
      return weatherMapping[main];
    } else {
      const weather = weatherMapping[main];
      return description.toLowerCase().includes('night') && weather.night ? weather.night : weather.day;
    }
  }
  return 'CLEAR_DAY';
};

const CurrentLocation = ({apiKey}) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [weatherMain, setWeatherMain] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const position = await getCurrentPosition();
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        fetchWeatherData({ lat: position.coords.latitude, lon: position.coords.longitude });
      } catch (error) {
        if (error.message === "User denied Geolocation") {
          setError("Geolocation permission denied");
        } else {
          setError(error.message);
        }
        setLoading(false);
      }
    };

    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const fetchWeatherData = ({ lat, lon, city }) => {
    let finalApiEnd = `${apiEndPoint}units=metric&appid=${apiKey}`;
    let locationString = '';
    
    if (city) {
      finalApiEnd += `&q=${city}`;
      locationString = ` for ${city}`;
    } else {
      finalApiEnd += `&lat=${lat}&lon=${lon}`;
    }
  
    fetch(finalApiEnd)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching weather data${locationString}`);
        }
        return response.json();
      })
      .then(data => {
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setVisibility(data.visibility);
        setWindSpeed(data.wind.speed);
        setWeatherMain(data.weather[0].main);
        setWeatherDescription(data.weather[0].description);
        setCity(data.name);
        setError(null);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  const handleSearch = () => {
    if (searchCity) {
      fetchWeatherData({ city: searchCity });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      {!latitude && !longitude && <Permission />}
      {latitude && longitude && (
        <div className="flex flex-col items-center space-y-4 glass p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="header-text mb-4">Weather Information</h2>
          <WeatherIcons icon={getWeatherIcon(weatherMain, weatherDescription)} size={64} animate={true} />
          <div className="w-full flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              className="input-box glass w-full md:w-1/2 p-2 rounded border border-gray-300"
              placeholder="Enter city name"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <button className="btn glass mt-4 md:mt-0 w-full md:w-auto p-2 bg-blue-500 text-white rounded" onClick={handleSearch}>Search</button>
          </div>
          <p className="large-text">City: {city}</p>
          <p className="large-text">Temperature: {Math.round(temp)}°C</p>
          <p className="large-text">Humidity: {humidity}%</p>
          <p className="large-text">Visibility: {Math.round(visibility / 1000)} km</p>
          <p className="large-text">Wind Speed: {Math.round(windSpeed * 3.6)} km/h</p>
          <p className="large-text">Weather: {weatherMain}</p>
          {error && <p className="error-text">{error}</p>}
          {loading && <p>Loading...</p>}
        </div>
      )}
    </div>
  );
};

export default CurrentLocation;
