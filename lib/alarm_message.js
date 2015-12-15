
function getWeatherMessage(location, callback) {
    getWeather(location["latitude"], location["longitude"], function(data) {
        if (data === null) {
            callback("WARNING: Failed to fetch weather data.");
        }
        var current_temp = data["temperature"];
        var apparent_temp = data["apparent_temperature"];
        var temperature_message = (
            "Currently the temperature is " +
            data["temperature"] +
            " degrees celcius."
        );
        if (!isNaN(apparent_temp)) {
            temperature_message += (
                "It feels like " +
                data["apparent_temperature"] +
                " degrees celcius."
            );
        }
        var precipitation_message = (
            data["precipitation"]["type"] === null ?
                "No rain is predicted for the next one hour." :
                "There's a " +
                data["precipitation"]["probability"] +
                " percent chance of " +
                data["precipitation"]["intensity"] +
                " " +
                data["precipitation"]["type"] +
                " in the next hour."
        );
        callback(temperature_message + " " + precipitation_message);
    });
}

function getTimeString(hours, minutes) {
    var minutes_string = minutes < 10 ?
        "0" + minutes :
        "" + minutes;

    if(hours < 12) {
        if (hours === 0) {
            hours = 12;
        }
        return hours + ":" + minutes_string + "AM";
    }
    hours -= 12;
    if (hours == 0) {
        hours = 12;
    }
    return hours + ":" + minutes_string + "PM";
}

function getDateTimeMessage() {
    var days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ];
    var months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December'
    ];
    var date = new Date();
    var date_message = ( 
        "It's " +
        days[date.getDay()] + ", " +
        date.getDate() + " " +
        months[date.getMonth()] + ", " +
        date.getFullYear() + "."
    );

    var time_message = (
        "The time is " +
        getTimeString(date.getHours(), date.getMinutes()) +
        "."
    );
    return date_message + " " + time_message;
}

function alarmMessageGenerator(weather_location, callback) {
    getWeatherMessage(weather_location, function(weather_message) {
        getQuoteOfTheDayMessage(function(qod_message) {
            var date_time_message = getDateTimeMessage();
            callback([
                "Good morning. ",
                date_time_message,
                weather_message,
                qod_message,
                "Get off your ass and get to work. "
            ]);
        });
    });
}