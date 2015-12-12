
var alarm_config = {
	"wake_up": {
		"time": "06:00",
		"play": "http://localhost:8000/wakeup.mp3",
		"weather_location": {
			"latitude": 51.5265822,
			"longitude": -0.1235648
		},
		"message": alarmMessageGenerator
	}
}

function isValidAlarm(alarm_name) {
	if (alarm_name in alarm_config) {
		return true;
	}
	return false;
}

function getAlarmTime(alarm_name) {
	console.log(alarm_config);
	console.log(alarm_name);
	return alarm_config[alarm_name]["time"];
}

function getAlarmTrack(alarm_name) {
	return alarm_config[alarm_name]["play"];
}

function getAlarmMessage(alarm_name) {
	var weather_location = getWeatherLocation(alarm_name);
	return alarm_config[alarm_name]["message"](weather_location);
}

function getWeatherLocation(alarm_name) {
	return alarm_config[alarm_name]["weather_location"];
}

function getAlarmList() {
	return Object.keys(alarm_config);
}