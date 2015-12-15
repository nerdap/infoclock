
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