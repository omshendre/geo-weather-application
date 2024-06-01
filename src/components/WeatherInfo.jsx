
import React from 'react';

const WeatherInfo = ({ temp, city }) => (
  <React.Fragment>
    <h1>Everything is okay</h1>
    {temp !== null && <p>Temperature: {Math.floor(temp)}°C</p>}
    {city && <p>City: {city}</p>}
  </React.Fragment>
);

export default WeatherInfo;
