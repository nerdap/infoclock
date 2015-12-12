// NOTE: Use python -m SimpleHTTPServer on the directory with the track.
// TODO: Put this project under source control
// Make the XMLHttpRequest call async in weather.js
function playAudio(file_path) {
	var audio = new Audio();
	audio.src = file_path;
	audio.play();
}

function playAlarm(alarm_name) {
	var file_path = getAlarmTrack(alarm_name);
	playAudio(file_path);
}

function getAlarmTimeInMsFromEpoch(time_of_day) {
	var parts = time_of_day.split(":");
	var alarm_hours = parseInt(parts[0]);
	var alarm_minutes = parseInt(parts[1]);
	var current_date = new Date(); 
	var current_hours = current_date.getHours();
	var current_minutes = current_date.getMinutes();
	var offset = 0;
	var alarm_date = new Date(current_date);
	alarm_date.setHours(alarm_hours);
	alarm_date.setMinutes(alarm_minutes);
	alarm_date.setSeconds(0);
	if (current_date.getTime() > alarm_date.getTime()) {
		offset = 24 * 60 * 60 * 1000;
		alarm_date = new Date(alarm_date.getTime() + offset);
	}
	return Date.now() + 2000;
	return alarm_date.getTime();
}

function setAlarm(alarm_name) {
	chrome.alarms.create(alarm_name, {
		"when": getAlarmTimeInMsFromEpoch(getAlarmTime(alarm_name)),
		"periodInMinutes": 24 * 60,
	});
}

function speakAlarmMessage(alarm_name) {
	var alarm_message = getAlarmMessage(alarm_name);
	var utterance = new SpeechSynthesisUtterance(alarm_message);
	utterance.voice = speechSynthesis.getVoices()[1];
	utterance.lang = "en-US";
	utterance.rate = 0.8;
	speechSynthesis.speak(utterance);
}


getAlarmList().forEach(function(alarm_name) {
	setAlarm(alarm_name);
});

chrome.alarms.onAlarm.addListener(function (alarm) {
	if (!isValidAlarm(alarm.name)) {
		return;
	}
	//playAlarm(alarm.name);
	speakAlarmMessage(alarm.name);
})
