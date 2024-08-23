import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const apiKey = "4deb9dcaf8bafa8ecfe2be9e9c7d02ca";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  const fetchApi = async () => {
    if (city.trim() === "") return; // Prevent API call if city is empty

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Error fetching data. Please try again.");
      setWeather({});
    }
  };

  useEffect(() => {
    if (city) fetchApi();
  }, [city]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    setCity(input);
    setInput("");
  };

  return (
    <div className="main" id="main">
      <div className="search">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="weather">
        {error && <h2>{error}</h2>}
        {!error && weather.main && (
          <>
            <h1>{city}</h1>
            <h2>{weather.main.temp}°F</h2>
            <h3>{weather.weather[0].description}</h3>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="weather icon"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
