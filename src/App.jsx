// App.jsx
import React from 'react';
import './App.css';
import CurrentLocation from './components/CurrentLocation';

const apiKey = import.meta.env.VITE_API_KEY;
function App() {
  return (
    <React.Fragment>
      <CurrentLocation apiKey ={apiKey} />
    </React.Fragment>
  );
}

export default App;
