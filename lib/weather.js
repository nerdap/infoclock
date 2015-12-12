
function httpGetSync(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, false);
	request.send(null);
	if (request.status === 200) {
		return request.reponseText;
	}
	return null;
}

function getForecastIoUrl(latitude, longitude) {
	return
		"https://api.forecast.io/forecast/97aa234cb4320192e0964f6c9bb9ffda/" +
		latitude +
		"," +
		longitude;
}

function fahrenheitToCelsius(temperature) {
	return (temperature - 32) * 5.0/9;
}

function getPrecipitationIntensityRating(intensity) {
	var intensity_rating = "none";
	var ratings = {
		"none": 0.0,
		"very light": 0.002,
		"light": 0.017,
		"moderate": 0.1,
		"heavy": 0.4
	};
	var best_match = Object.keys(ratings)[0];
	for (var key in ratings) {
		var prev = Math.abs(intensity - ratings[best_match]);
		var cur = Math.abs(intensity - ratings[key]);
		if (cur < prev) {
			best_match = key;
		}
	}
	return best_match;
}

function getPrecipitationData(data_point) {
	var intensity = data_point["precipIntensity"];
	var type = "precipType" in data_point ? data_point["precipType"] : null;
	var probability = data_point["precipProbability"];

	return {
		"probability": Math.round(probability * 100),
		"type": type,
		"intensity": getPrecipitationIntensityRating(intensity)
	};
}

function getWeather(latitude, longitude) {
	var url = getForecastIoUrl(latitude, longitude);
	var weather_json = httpGetSync(url);
	if (weather_json === null) {
		return null;
	}
	var weather_obj = JSON.parse(weather_json);
	var current_weather = weather_obj["currently"];
	return {
		"temperature": fahrenheitToCelsius(current_weather["temperature"]),
		"apparent_temperature":
			fahrenheitToCelcius(current_weather["apparent_temperature"]),
		"precipitation": getPrecipitationData(current_weather)
	};
}