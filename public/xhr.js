/* eslint-disable */

var lat = document.getElementById('lat');
var lng = document.getElementById('lng');
var distance = document.getElementById('distance');
var xhrRequest = function(cb) {
    var url = '/events/?' + 'lat=' + lat.value + '&lng=' + lng.value + '&distance=' + distance.value;
    console.log(url)
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            var latlng = {
                lat: Number(lat.value),
                lng: Number(lng.value),
            }
            cb(xhr.responseText, latlng);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
};
