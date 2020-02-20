$(document).ready(function(){
  $(document).on('keypress',function(event) {
    if ($("#search").val() === "") {
      return;
    }
    else {
      if(event.which == 13) {
        findRecipe($("#search").val());
      }
    }
  });

  
  $(".btn-large").click(function() {
    if ($("#search").val() === "") {
      return;
    }
    else {
      if ($(this).text() === "Dine-In") {  
        findRecipe($("#search").val());       
      }
      else if ($(this).text() === "Dine-Out") {
        mapIt($("#search").val());
        console.log("mapIt(event)");
      }
    }
  });

});

// AJAX function to find the recipe
function findRecipe(input) {   
  event.preventDefault();  
  let edamamURL = "https://api.edamam.com/search?q=" + input + "&app_id=29622eed&app_key=898538197a883e8c6561872a165ee750";

  $.ajax({
    url: edamamURL,
    method: "GET"
  }).then( function(response) {
    console.log("inside edamam's ajax");
    console.log(response);

    let arr = [];
    if (response.q === "")
    {
      alert ("You've reached your ajax query limit. You won't be able to do any search anymore!");
    }
    else {
      for (let i = 0; i < 10; i++) {
        arr.push({
          label: response.hits[i].recipe.label,
          ingredients: response.hits[i].recipe.ingredientLines,
          url: response.hits[i].recipe.shareAs
        });
      }
    }

      localStorage.setItem("recipe", JSON.stringify(arr));
      $(window).attr("location", "recipePage.html");  // this is to direct users to the recipePage.html

  });

}

// AJAX function to find places recommendation
function mapIt (input) {
  console.log("*********** input ********" + input);
  // let placeURL = "https://maps.googleapis.com/maps/api/json?input=" + input + "&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@37.8647953,-122.2583164&key=AIzaSyC4LwhAqGAstUc8yaViZjU2yPZDSzBwhPU";
  // let placeURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + input + "&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@37.8647953,-122.2583164&key=AIzaSyCgRcaS_zBe04Z4rSZj6ZnA1VN3vDZIhEc";

  
  var map;
  var infowindow;

  function initialize() {
    console.log("inside initialize()");
    var center = new google.maps.LatLng(37.8647953, -122.2583164);
    map = new google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom:13
    });

    var request = {
      location: ClientRect, 
      radius: 8047, // in meters, which means within 5 miles
      types: [input]
    };

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }

  function callback (results, status) {
    console.log("inside callback()");
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i<results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker (place) {
    console.log("inside createMarker()");
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map, 
      position: place.geometery.location
    });

    google.maps.event.addListener (marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  // $.ajax({
  //   url: placeURL,
  //   method: "POST"
  // })

  // $.ajax({
  //   url: placeURL,
  //   crossOrigin: null,
  //   method: "GET"
  // }).then (function(response) {
  //   console.log("inside Google Place");
  //   console.log(response);

  //   $(window).attr("location", "locationPage.html");  // this is to direct users to the locationPage.html

  // });
}

$(document).ready(function(){
  $('.fixed-action-btn').floatingActionButton();
});
