$(document).ready(function(){
  let searchInput = $("#search").val();

  $(document).on('keypress',function(event) {
    if(event.which == 13) {
      findRecipe(searchInput);
    }
  });

  
  $(".btn-large").click(function() {
    if ($("#search").val() === "") {
      return;
    }
    else {
      if ($(this).text() === "Dine-In") {        
        findRecipe(searchInput);       
      }
      else if ($(this).text() === "Dine-Out") {
        mapIt(searchInput);
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
  let placeURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + input + "&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY";

  $.ajax( {
    url: placeURL,
    method: "GET"
  }).then (function(response) {
    console.log("inside Google Place");
    console.log(response);



    $(window).attr("location", "locationPage.html");  // this is to direct users to the locationPage.html

  });
}
