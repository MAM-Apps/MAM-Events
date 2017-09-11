/* eslint-disable */
var form = document.getElementById('map-form');

function initMap() {
  // Map options - this is passed to the new google maps as a variable
  var mapOptions = {
    // Zoom goes up to 16 - this is the closest we can zoom
    zoom: 14,
    // Centred at FAC
    center: {
      lat: 51.530881,
      lng: -0.042137,
    },
  };
  // Create an array to store all markers so they can be clustered
  var markClust = [];

  // Create new google map and send to DOM
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Create new Market Clusterer object, passing in markCLust array
  var markerCluster = new MarkerClusterer(
    map, markClust, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    },
  );
  var markers = [];

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    rmvMarker();
    xhrRequest(function(response) {
      var responseObject = JSON.parse(response);
      map.setZoom(10);
      map.panTo(responseObject.centre);
      responseObject.eventArray.forEach(function(el) {
        addMarker({
          coords: el[0],
          content: el[1],
        });
      });
    });
  });

  function addMarker(props) {
    var marker = new google.maps.Marker({
      // get the event's coordinates (on click)
      position: props.coords,
      // this is a key value pair identifying the map in use
      map,
      // icon:props.iconImage
    });

    // Check for customicon
    if (props.iconImage) {
      // Set icon image
      marker.setIcon(props.iconImage);
    }
    // adds marker to the cluster - updates the rest
    // this addmarker belongs to markerclusterer class
    markerCluster.addMarker(marker);
    markClust.push(marker);
    // Check content
    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        // populate this with event information

        content: props.content,
      });
      // Add info window
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    }
    // addlistener to remove the marker
    // Not needed for MVP
    google.maps.event.addListener(marker, 'dblclick', (event) => {
      console.log('You just double clicked');

    });
  }

  // function to remove marker
  function rmvMarker() {

    markClust.forEach(function(el) {
      el.setMap(null)
    })
    markerCluster.clearMarkers();
    markClust = [];
  }
  // Check to see if the bound have changed and to retrieve new bounds
  google.maps.event.addListener(map, 'bounds_changed', () => {
    var bounds = map.getBounds();
    // console.log(bounds);
  });
}
