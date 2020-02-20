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

// A function to find places recommendation
function mapIt (input) {
  console.log("*********** input ********" + input);
  let placeURL = "https://maps.googleapis.com/maps/api/json?input=" + input + "&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@37.8647953,-122.2583164&key=AIzaSyC4LwhAqGAstUc8yaViZjU2yPZDSzBwhPU";
}