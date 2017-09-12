/* eslint-disable */
var form = document.getElementById('map-form');
var lat = document.getElementById('lat');
var lng = document.getElementById('lng');
var address = document.getElementById('address');
var until = document.getElementById('until');
var distance = document.getElementById('distance');

var distance = document.getElementById('distance');
var xhrRequest = function(cb) {
  var dateTime = new Date(until.value).getTime();
  var timestamp = Math.floor(dateTime / 1000);
  if (lat.value && lng.value) {
    var url = '/events/?' + '&input=geo&lat=' + lat.value + '&lng=' + lng.value + '&distance=' + distance.value + '&until=' + timestamp;
  } else {
    var url = '/events/?&input=search&address=' + address.value + "&until=" + timestamp + '&distance=' + distance.value;
  }
  // console.log(url);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      cb(xhr.responseText);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};
