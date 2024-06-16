// App.jsx
import './App.css';
import CurrentLocation from './components/CurrentLocation';

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  return (
    <div className="app">
        <CurrentLocation apiKey={apiKey} />
    </div>
  );
}

export default App;
