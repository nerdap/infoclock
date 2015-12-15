var AlarmConfig = (function() {
    var alarm_config = {
        "wake_up": {
            "time": "06:00",
            "track": "http://localhost:5000/static/wakeup.mp3",
            "weather_location": {
                "latitude": 51.5265822,
                "longitude": -0.1235648
            },
            "message_generator": alarmMessageGenerator
        }
    };

    var alarms = {};

    function AlarmConfig(
        name,
        time,
        track,
        weather_location,
        message_generator
    ) {
        this.name = name;
        this.time = time;
        this.track = track;
        this.weather_location = weather_location;
        this.message_generator = message_generator;
    }
    AlarmConfig.prototype.getName = function() {
        return this.name;
    }
    AlarmConfig.prototype.getTime = function() {
        return this.time;
    }
    AlarmConfig.prototype.getTrack = function() {
        return this.track;
    }
    AlarmConfig.prototype.getMessages = function(callback) {
        this.message_generator(this.weather_location, callback);
    }

    AlarmConfig.isValidAlarm = function(alarm_name) {
        if (alarm_name in alarms) {
            return true;
        }
        return false;
    }
    AlarmConfig.getAlarm = function(alarm_name) {
        return alarms[alarm_name];
    }
    AlarmConfig.getAlarmList = function() {
        return Object.keys(alarms).map(key => alarms[key]);
    }

    for(alarm_name in alarm_config) {
        alarms[alarm_name] = new AlarmConfig(
            alarm_name,
            alarm_config[alarm_name]["time"],
            alarm_config[alarm_name]["track"],
            alarm_config[alarm_name]["weather_location"],
            alarm_config[alarm_name]["message_generator"]
        );
    }
    return AlarmConfig;
}());