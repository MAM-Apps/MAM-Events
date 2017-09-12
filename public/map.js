/* eslint-disable */
var form = document.getElementById('map-form');

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
                infoWindow2.setContent('Location found.');
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
    var mapOptions = {
        // Zoom goes up to 16 - this it the closest we can zoom
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

    var centerControlDiv = document.createElement('div');
    var centerControl = new myLocation(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

    // Create new Market Clusterer object, passing in markCLust array
    var markerCluster = new MarkerClusterer(
        map, markClust, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        },
    );



    // Listen for click on map
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        rmvMarker();
        xhrRequest(function(response, centre) {
            var eventArray = JSON.parse(response);
            map.setZoom(10);
            map.panTo(centre);
            eventArray.forEach(function(el) {
                addMarker({
                    coords: el,
                });
            });
        });

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
        console.log(bounds);
        //map.getCentre()
        //find displacements
    });
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
