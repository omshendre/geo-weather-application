import React from 'react';
import WeatherIconsImage from '../images/WeatherIcons.gif';

const Permission = () => (
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative glass p-8 rounded-lg shadow-lg">
      <h1 className="header-text text-center text-white mb-4">Detecting Your Current Location</h1>
      <div className="flex justify-center mb-4">
        <img src={WeatherIconsImage} alt="Weather Icons" className="h-16" />
      </div>
      <p className="large-text text-center text-gray-300">Your current location will be displayed on the app and used for calculating real-time weather</p>
    </div>
  </div>
);

export default Permission;
