
function httpGet(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(e) {
        if (request.readyState == 4) {
            if (request.status !== 200) {
                callback(null);
            } else {
                callback(request.responseText);
            }
        }
    };
    request.open('GET', url);
    request.send(null);
}

function getForecastIoUrl(latitude, longitude) {
    return (
        "https://api.forecast.io/forecast/97aa234cb4320192e0964f6c9bb9ffda/" +
        latitude +
        "," +
        longitude
    );
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

function getWeather(latitude, longitude, callback) {
    var url = getForecastIoUrl(latitude, longitude);
    httpGet(url, function(weather_json) {
        if (weather_json === null) {
            callback(null);
            return;
        }
        var weather_obj = JSON.parse(weather_json);
        var current_weather = weather_obj["currently"];
        alert(current_weather["apparent_temperature"]);
        var temperature = Math.round(fahrenheitToCelsius(
            current_weather["temperature"]
        ));
        var apparent_temperature = Math.round(fahrenheitToCelsius(
            current_weather["apparent_temperature"]
        ));
        callback({
            "temperature": temperature,
            "apparent_temperature": apparent_temperature,
            "precipitation": getPrecipitationData(current_weather)
        });
    });
}