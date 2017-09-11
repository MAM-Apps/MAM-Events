/* eslint-disable */
var form = document.getElementById('map-form');
var lat = document.getElementById('lat');
var lng = document.getElementById('lng');
var distance = document.getElementById('distance');
var xhrRequest = function(cb) {
  var url = '/events/?' + 'lat=' + lat.value + '&lng=' + lng.value + '&distance=' + distance.value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
      cb(xhr.responseText);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};
