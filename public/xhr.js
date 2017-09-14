/* eslint-disable */
var form = document.getElementById('map-form');
var lat = document.getElementById('lat');
var lng = document.getElementById('lng');
var address = document.getElementById('address');
var until = document.getElementById('until');
var distance = document.getElementById('distance');

var distance = document.getElementById('distance');
var xhrRequest = function(options, cb) {
    var url = '/events/?' + 'input=geo&lat=' + options.latCenter + '&lng=' + options.lngCenter + '&distance=' + options.radius + '&timemethod=' + options.timeMethod;

    if (options.timeMethod === 'custom-go') {
      url += '&date=' + options.date;
    }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText)
        document.getElementById("map-load").style.visibility = "hidden";
      cb(xhr.responseText);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};
