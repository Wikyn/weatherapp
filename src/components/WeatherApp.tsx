import React, { useState } from "react";
import axios from "axios";

interface Response {
  name: string;
  main: {
    temp: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
}
const WeatherApp = () => {
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [response, setResponse] = useState<Response | undefined>();

  const APIkey = "9da8b3e0cd6b58fdbf3c89b514af39ab";
  const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&lang=cz&units=metric`;

  const handleSearch = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    axios
      .get(endpoint)
      .then((response: any) => {
        setResponse(response.data);
        setLoading(false);
      })
      .catch((error: string) => {
        setLoading(false);
        setError(error.toString());
        console.log(error);
      });
    setCity("");
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <div>
      {loading && <p>loading...</p>}

      {!loading && (
        <form onSubmit={handleSearch}>
          <input type="text" name="cityName" onChange={handleCity} placeholder="Enter City" value={city} />
          <button type="submit">Search for Results</button>
        </form>
      )}

      {response && !error && !loading && (
        <>
          <h3 className="city">{response.name}</h3>
          <p>{response.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`}
            width="100"
            height="100"
            alt="icon"
          ></img>
          <p>{Math.floor(response.main.temp)}°C</p>
        </>
      )}

      {error && (
        <>
          <p>{error}</p>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
