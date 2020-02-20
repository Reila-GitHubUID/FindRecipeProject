
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
            radius: '500',
            query: 'restaurant'
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

// // let array = JSON.parse(localStorage.getItem("recipe"));

// $(document).ready(function(){
//     console.log("Picaboooo!!");

//     // for (let i = 0; i<array.length; i++) {
//         let card = $("<div>").addClass("card");
//         card.append($("<div>").addClass("card-image waves-effect waves-block waves-light").append("<img>").addClass("activator").attr("src", ""));

//         let cardContent = $("<div>").addClass("card-content");
//         cardContent.append($("<span>").addClass("card-title activator grey-text text-darken-4").text(array[i].label)).append($("<i>").addClass("material-icons right").text("more_vert"));
//         cardContent.append($("<p>"));
//         cardContent.append($("<a>").addClass("theURL").attr("href", array[i].url).text("See complete recipe"));
//         card.append(cardContent);

//         let cardReveal = $("<div>").addClass("card-reveal");
//         cardReveal.append($("<span>").addClass("card-title grey-text text-darken-4").text("Recipe").append($("<i>").addClass("material-icons right").text("close")));
//         cardReveal.append($("<span>").text(array[i].ingredients));

//         cardReveal.append($("<p>").text("placeholder"));
//         card.append(cardReveal);

//         $(".row").append(card);
//     // }

// });