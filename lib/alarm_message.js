
function getWeatherMessage(location) {
	data = getWeather(location["latitude"], location["longitude"]);
	if (data === null) {
		console.error("Could not get weather.");
		return "";
	}
	var temperature_message =
		"Currently the temperature is " +
		data["temperature"] +
		" degrees celcius; it feels like " +
		data["apparent_temperature"] +
		" degrees celcius.";
	var precipitation_message = data["precipitation"]["type"] === null ?
		"" :
		"There's a " +
		data["precipitation"]["probability"] +
		" percent chance of " +
		data["precipitation"]["intensity"] +
		" " +
		data["precipitation"]["type"] +
		" in the next hour.";
	return temperature_message + " " + precipitation_message;
}

function getDateTimeMessage() {
	var days = [
		'Sunday', 'Monday', 'Tuesday', 'Wednesday',
		'Thursday','Friday','Saturday'
	];
	var months = [
		'January', 'February', 'March', 'April', 'May',
		'June', 'July', 'August', 'September', 'October',
		'November', 'December'
	];
	var date = new Date();
	var date_message =
		"It's " +
		days[date.getDay()] + ", " +
		date.getDate() + " " +
		months[date.getMonth()] + ", " +
		date.getFullYear() + ".";
	var time_message = "The time is " + date.getHours() + ":" + date.getMinutes() + ".";
	return date_message + " " + time_message;
}

function alarmMessageGenerator(weather_location) {
	var weather_message = getWeatherMessage(weather_location);
	var date_time_message = getDateTimeMessage();
	return
		"Good morning. " +
		date_time_message + " " +
		weather_message + " " +
		"Get off your ass and get to work. ";
}