// These functions should be in some JS file
// All the functions for the map:
//
function initMap() {
  // Map options - this is passed to the new google maps as a variable
  const mapOptions = {
    // Zoom goes up to 16 - this it the closest we can zoom
    zoom: 14,
    // Centred at FAC
    center: {
      lat: 51.530881,
      lng: -0.042137,
    },
  };
  // Create an array to store all markers so they can be clustered
  const markClust = [];


  // Create new google map and send to DOM
  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Create new Market Clusterer object, passing in markCLust array
  const markerCluster = new MarkerClusterer(
    map, markClust,
    { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' },
  );


    // Listen for click on map
  google.maps.event.addListener(map, 'click', (event) => {
    // Add marker
    addMarker({
      coords: event.latLng,
    });
  });


  // Array of markers for testing to pop up initially on map - To delete
  const markers = [{
    coords: {
      lat: 51.530881,
      lng: -0.042137,
    },
    iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content: '<h1>Lynn MA</h1>',
  },
  {
    coords: {
      lat: 51.530881,
      lng: -0.042137,
    },
    content: '<h1>Amesbury MA</h1>',
  },

  ];

    // Loop through markers array and populate on the page
  for (let i = 0; i < markers.length; i++) {
    // Add marker
    addMarker(markers[i]);
  }

  // Add Marker Function
  // This creates the marker. This function will be called by the add marker event listener
  // props is the event properties
  function addMarker(props) {
    const lat = '';
    const lng = '';
    const content = 'placeholder';
    const marker = new google.maps.Marker({
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
      const infoWindow = new google.maps.InfoWindow({
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
      rmvMarker(marker);
    });
  }

  // function to remove marker
  function rmvMarker(marker) {
    console.log(marker);
    console.log(`The index of this marker is ${markClust.indexOf(marker)}`);
    console.log(markClust);

    const markerIndex = markClust.indexOf(marker);
    console.log(markerIndex);

    if (markerIndex !== -1) {
      markClust.splice(markerIndex, 1);
      console.log(`The array now is: ${markClust}`);
      console.log(markClust);
      marker.setMap(null);
    }
  }
  // Check to see if the bound have changed and to retrieve new bounds
  google.maps.event.addListener(map, 'bounds_changed', () => {
    const bounds = map.getBounds();
    console.log(bounds);
  });
}
