let array = JSON.parse(localStorage.getItem("recipe"));
let searchWord = array[0];

// This example requires the Places library. Include the libraries=places
// parameter when you finitMap() {
// var sydney = irst load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var service;
var infowindow;

function initMap() {
    var berkeley = new google.maps.LatLng(37.8647953, -122.2583164);

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(
        document.getElementById('map'), { center: berkeley, zoom: 15 });

        var request = {
            location: berkeley,
            radius: '8045',
            query: searchWord
          };
        
          service = new google.maps.places.PlacesService(map);
          service.textSearch(request, callback);
        }
        
        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var place = results[i];
              createMarker(results[i]);
            }
          }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}