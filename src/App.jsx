// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import CurrentLocation from './components/CurrentLocation';
import Loader from './Loader'; // Import the Loader component

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data (replace with actual logic to fetch weather data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {loading ? (
        <Loader /> // Display the Loader component while loading
      ) : (
        <CurrentLocation apiKey={apiKey} />
      )}
    </div>
  );
}

export default App;
