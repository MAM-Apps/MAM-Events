/* eslint-disable */
var form = document.getElementById('map-form');
var customDate = document.getElementById('custom-date');
var customGo = document.getElementById('custom-go');
var date = document.getElementById('date')
function myLocation(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  //controlUI.style.backgroundColor = '#fff';
  //controlUI.style.border = '2px solid #fff';
  //controlUI.style.borderRadius = '3px';
  //controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  //controlUI.style.marginBottom = '5px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to find your location';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '15px';
  controlText.style.paddingTop = '25px';
  controlText.innerHTML = "<a href='#'><img src='./mylocation.png' border=0/></a>";
  controlUI.appendChild(controlText);

  infoWindow2 = new google.maps.InfoWindow;

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow2.setPosition(pos);
        infoWindow2.setContent('<p style="color:black">You\'re here</p>');

        infoWindow2.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    //map.setCenter({lat: 41.850, lng: -87.650});

  });

}

function initMap() {
  // Map options - this is passed to the new google maps as a variable
  var mapOptions = function(callback) {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function(position) {
        var opts = {
          zoom: 15,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          mapTypeControl: false,

        };
        callback(opts)

      });


    } else {
      var opts = {
        // Zoom goes up to 16 - this it the closest we can zoom
        zoom: 15,
        // Centred at FAC
        center: {
          lat: 51.530881,
          lng: -0.042137,
        },
        mapTypeControl: false,
      }
      callback(opts)
    }


  }

  var createMap = function(mapOption) {

    // Create an array to store all markers so they can be clustered
    var markClust = [];

    // Create new google map and send to DOM
    var map = new google.maps.Map(document.getElementById('map'), mapOption);

      google.maps.event.addListenerOnce(map, 'idle', function(){
          console.log('success')
          var load_screen = document.getElementById("loader");
          var bigSpinner = document.getElementById('big-spinner');
          var readyButton = document.createElement("button");
          var readyDiv = document.getElementById("ready");
          var header = document.getElementById('header');
          var readyContent = document.createTextNode('X');
          var instructionsDiv = document.getElementById('instructions');
          var title = document.getElementById('title');
          setTimeout(function() {
              instructionsDiv.classList.toggle('no-display');
          }, 600);
          bigSpinner.classList.toggle('spinner-fade');
          readyButton.textContent = 'X';
          readyDiv.appendChild(readyButton);
          readyButton.classList.add('ready-button');
          readyButton.addEventListener('click', function(e) {
              header.appendChild(title);
              setTimeout(function() {
                  load_screen.remove();
              }, 2100);
              load_screen.classList.add("fade-loader");
              // load_screen.remove();
              main.style.visibility = "visible";




          });


      });


    var centerControlDiv = document.createElement('div');
    var centerControl = new myLocation(centerControlDiv, map);
      var mapError = document.getElementById('map-error');


      centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

    // Create infowindow
    var OMSInfoWindow = new google.maps.InfoWindow();

    // Create OverlappingMarkerSpiderfier instsance
    var oms = new OverlappingMarkerSpiderfier(map, {
      markersWontMove: true,
      markersWontHide: true,
      circleFootSeparation: 70
    });

    // This is necessary to make the Spiderfy work
    oms.addListener('click', function(marker) {
      OMSInfoWindow.setContent(marker.desc);
      //OMSInfoWindow.open(map, marker);
        oms.keepSpiderfied = true;
    });

      oms.addListener('dblclick', function(marker) {
          OMSInfoWindow.setContent(marker.desc);
          //OMSInfoWindow.open(map, marker);
          oms.keepSpiderfied = false;
      });
    // Create new Market Clusterer object, passing in markCLust array
    var markerCluster = new MarkerClusterer(
      map, markClust, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        maxZoom: 14
      },
    );

    // Create autocomplete search bar
    var acInput = document.createElement('input');

    var acOptions = {};
    acInput.id = 'ac-input';
    acInput.className = 'ac';
    acInput.setAttribute('type', 'text');
    acInput.setAttribute('placeholder', 'Find a place...');
    var autocomplete = new google.maps.places.Autocomplete(acInput, acOptions);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(acInput);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var aPlace = autocomplete.getPlace();
        mapError.innerText ="";
      if(aPlace.geometry===undefined){
          mapError.innerText = 'Not a valid place!'
      }else{

          var latLng = {
              lat: aPlace.geometry.location.lat(),
              lng: aPlace.geometry.location.lng(),
          };
          map.setCenter(latLng);
          map.setZoom(16)
      }

    });
    google.maps.event.addListener(map, 'bounds_changed', () => {
      bounds = map.getBounds();
      var southWest= {
        lat: bounds.f.b,
        lng: bounds.b.b,
      };
      var northEast = {
        lat: bounds.f.f,
        lng: bounds.b.f,
      };
      center = map.getCenter();
      console.log('Center Lat : ', center.lat(), 'Center Lng: ', center.lng());
      console.log('sw Lat : ', southWest.lat, 'sw Lng: ', southWest.lng);
      //map.getCentre()
      //find displacements
    });

    customDate.addEventListener('click', function (e) {
        document.getElementById("date-input").style.visibility = "visible";
        var flipper = document.getElementById('flipper');
        flipper.classList.toggle("flipper-click");
        flipper.classList.toggle("flipper-click-reverse");
    });



    var buttons = document.getElementById('buttons');
    buttons.addEventListener('click', function(e) {
        e.preventDefault();
      var bounds = map.getBounds()
      var center = map.getCenter();
      var latSW = bounds.f.b;
      var lngSW = bounds.b.b;
      var latCenter = center.lat();
      var lngCenter = center.lng();
      var lngCenter = center.lng();
      var timeMethod = e.target.id;
      console.log(e.target.id);
      mapError.textContent="";

        rmvMarker();
      var radius = latLngToRadius(latSW, lngSW, latCenter, lngCenter);
      console.log('radius is' + radius);
      var locationData = {
        latCenter: latCenter,
        lngCenter: lngCenter,
        radius: radius,
        timeMethod: timeMethod
      };
      console.log(timeMethod )
      if (timeMethod === 'custom-date'|| timeMethod === 'buttons'){
        return;
      }else if (timeMethod === 'custom-go') {

          var dateCheck =  new Date(date.value);
          console.log(date.value);
          if (date.value){
              document.getElementById("date-input").style.visibility = "hidden";
              var flipper = document.getElementById('flipper');
              flipper.classList.toggle("flipper-click");
              flipper.classList.toggle("flipper-click-reverse");
              locationData.date = date.value;
              document.getElementById("map-load").style.visibility = "visible";
              updateMap();
          } else{
              mapError.innerText = 'Not a valid date!'
          }


      }else{
          document.getElementById("map-load").style.visibility = "visible";
          updateMap();
      }
        function updateMap(){
            xhrRequest(locationData, function(response) {
                console.log('Location data inside',locationData)
                var responseObject = JSON.parse(response);
                // console.log(responseObject);
                // map.setZoom(10);
                var centre = {
                    lat: Number(responseObject.centre.lat),
                    lng: Number(responseObject.centre.lng),
                }
                map.panTo(centre);
                if(responseObject.eventArray===undefined || responseObject.eventArray.length === 0){
                    console.log('no results')

                    mapError.innerText = 'No results found.'
                }else{
                    responseObject.eventArray.forEach(function(el) {

                        addMarker({
                            coords: el.geocode,
                            content: el.eventInfo,
                            //icon: icon
                        });
                    });
                    map.setZoom(14);
                }
            })};

        //console.log(responseObject.eventArray[0].geocode);



    });


    // Add Marker Function
    // This creates the marker. This function will be called by the add marker event listener
    // props is the event properties
    function addMarker(props) {
      var content = 'placeholder';
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
      oms.addMarker(marker);
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

    }

      function latLngToRadius(fromLat, fromLng, toLat, toLng) { // generally used geo measurement function
          return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));
      } // CalculateDistance
      console.log(latLngToRadius(87, 40, -30, 25));

      // function to remove marker
    function rmvMarker() {

      markClust.forEach(function(el) {
        el.setMap(null)
      })
      markerCluster.clearMarkers();
      markClust = [];
    }
    // Check to see if the bound have changed and to retrieve new bounds

  };
  mapOptions(createMap);

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
