import { useEffect, useState } from "preact/hooks";

const ciudades = [
    {name: "London", latitude : 51.5074, longitude: 0.1278},
    {name: "Paris", latitude : 48.8566, longitude: 2.3522},
    {name: "Madrid", latitude : 40.4168, longitude: 3.7038},
    {name: "Berlin", latitude : 52.5200, longitude: 13.4050},
    {name: "Rome", latitude : 41.9028, longitude: 12.4964},
    {name: "Athens", latitude : 37.9838, longitude: 23.7275},
    {name: "Amsterdam", latitude : 52.3676, longitude: 4.9041},
    {name: "Brussels", latitude : 50.8503, longitude: 4.3517},
    {name: "Lisbon", latitude : 38.7223, longitude: 9.1393},
];

type dtiempo = {
    relative_humidity_2m: number;
    temperature_2m: number;
    wind_speed_10m: number;
    rain: number;
};

export const Tiempo = () => {
    const [selectedCity, setSelectedCity] = useState(ciudades[0]);
    const [showTemperature, setShowTemperature] = useState(true);
    const [showRelativeHumidity, setShowRelativeHumidity] = useState(true);
    const [showRain, setShowRain] = useState(true);
    const [showWindSpeed, setShowWindSpeed] = useState(true);
    const [datos, setDatos] = useState<dtiempo>();

    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m`
            );
            const data = await response.json();
            const datostiempo: dtiempo = {
                relative_humidity_2m: data.current.relative_humidity_2m,
                temperature_2m: data.current.temperature_2m,
                wind_speed_10m: data.current.wind_speed_10m,
                rain: data.current.rain,
            };
            setDatos(datostiempo);
        };
        fetchWeatherData();
    }, [selectedCity]);

    return (
        <div className="container">
            <h1>El tiempo</h1>
            <select
                value={selectedCity.name}
                onChange={(e) => {
                    const city = ciudades.find((c) => c.name === e.currentTarget.value);
                    setSelectedCity(city);
                }}
            >
                {ciudades.map((city) => (
                    <option key={city.name} value={city.name}>
                        {city.name}
                    </option>
                ))}
            </select>
            <div className="checkbox-container">
                <label>
                    <input
                        type="checkbox"
                        checked={showTemperature}
                        onChange={() => setShowTemperature(!showTemperature)}
                    />
                    Temperature
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showRelativeHumidity}
                        onChange={() => setShowRelativeHumidity(!showRelativeHumidity)}
                    />
                    Relative Humidity
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showRain}
                        onChange={() => setShowRain(!showRain)}
                    />
                    Rain
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showWindSpeed}
                        onChange={() => setShowWindSpeed(!showWindSpeed)}
                    />
                    Wind Speed
                </label>
            </div>
            <div className="data-container">
                {showTemperature && <p>Temperatura: {datos && datos.temperature_2m}ºC</p>}
                {showRelativeHumidity && <p>Humedad: {datos && datos.relative_humidity_2m}%</p>}
                {showRain && <p>Precipitaciones: {datos && datos.rain}</p>}
                {showWindSpeed && <p>Viento: {datos && datos.wind_speed_10m}km</p>}
            </div>
        </div>
    );
};

export default Tiempo;