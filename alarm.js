// NOTE: Use python -m SimpleHTTPServer on the directory with the track.
function playAudio(file_path) {
    var audio = new Audio();
    audio.src = file_path;
    audio.play();
}

function playAlarm(alarm_config) {
    var file_path = alarm_config.getTrack();
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

function speakMessages(messages, i) {
    var sentence_delay = 2000;
    if (i >= messages.length) {
        return;
    }
    var utterance = new SpeechSynthesisUtterance(messages[i]);
    utterance.voice = speechSynthesis.getVoices()[1];
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    utterance.onend = function(event) {
        setTimeout(
            speakMessages,
            sentence_delay,
            messages,
            i + 1
        );
    };
    console.log("SAYING: " + messages[i]);
    speechSynthesis.speak(utterance);
}

function speakAlarmMessage(alarm_config) {
    alarm_config.getMessages(function(alarm_messages) {
        speakMessages(alarm_messages, 0);
    });
}

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (!AlarmConfig.isValidAlarm(alarm.name)) {
        console.error("Could not find alarm \'" + alarm.name + "\'");
        return;
    }
    var alarm_config = AlarmConfig.getAlarm(alarm.name);
    //playAlarm(alarm_config);
    speakAlarmMessage(alarm_config);
});

// Set alarms.
AlarmConfig.getAlarmList().forEach(function(alarm) {
    chrome.alarms.create(alarm.getName(), {
        "when": getAlarmTimeInMsFromEpoch(alarm.getTime()),
        "periodInMinutes": 24 * 60, // Repeat alarm daily.
    });
});
