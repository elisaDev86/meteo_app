import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [temp, setTemp] = useState("");
	const [min, setMin] = useState("");
	const [max, setMax] = useState("");
	const [description, setDescription] = useState("");
	const [icon, setIcon] = useState("");
	const [showMyComponent, setShowMyComponent] = useState(false);

	const getWeatherData = async (city, country) => {
		await axios({
			method: "GET",
			url: `https://api.openweathermap.org/data/2.5/weather?q=${city},${country},{state code}&appid=57de77a828f952a91d798ba2d1a6461b`,
		})
			.then((res) => {
				console.log(res.data.main.temp);
				setTemp(res.data.main.temp - 273.15);
				setIcon(res.data.weather[0].icon);
				setMin(res.data.main.temp_min - 273.15);
				setMax(res.data.main.temp_max - 273.15);
				setDescription(res.data.weather[0].description);
				setCountry(res.data.sys.country);
				setShowMyComponent(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="container my-4">
			<input
				type="text"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				placeholder="Enter City name"
				className="mx-1 p-1"
			/>
			<input
				type="text"
				value={country}
				onChange={(e) => setCountry(e.target.value)}
				placeholder="Country name"
				className="mx-2 p-1"
			/>
			<button
				onClick={() => getWeatherData(city, country)}
				className="btn btn-primary"
				style={{
					backgroundColor: "#51456a",
					fontWeight: "bold",
					fontSize: 28,
					border: 0,
				}}
			>
				Click Me!
			</button>

			{showMyComponent ? (
				<div className="data_container p-4 my-5">
					<h1>
						{city} {country}
					</h1>
					<div className="my-2">
						<img
							src={` https://openweathermap.org/img/wn/${icon}@2x.png`}
							alt="weather-icon"
							style={{ width: 200, height: 200 }}
						/>
					</div>
					{temp ? <h1>{Math.floor(temp)}℃</h1> : null}
					<h4 className="my -4">
						Min:<span>{Math.floor(min)}℃</span>{" "}
						<span className="mx -3">|</span> Max:
						<span>{Math.floor(max)}℃</span>
					</h4>

					<h1>{description}</h1>
                    <h4 className="my-4">Date: {new Date().toLocaleDateString()}</h4>
				</div>
			) : null}
		</div>
	);
};

export default Weather;
