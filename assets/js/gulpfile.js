localStorage.setItem("recipe", "");
// let temp = $(".filled-in").

$(document).ready(function(){
  $(document).on('keypress',function(event) {

    if ($("#search").val() === "") {
      return;
    }
    else {
      if(event.which == 13) {
        findRecipe();
      }
    }
  });

  
  $(".btn-large").click(function() {

    if ($("#search").val() === "") {
      return;
    }
    else {
      if ($(this).text() === "Dine-In") {  
        findRecipe();       
      }
      else if ($(this).text() === "Dine-Out") {
        findMap();
      }
    }
  });  

  
  $('input[type="checkbox"]').click(function() {
    if($(this).prop("checked") == true){
        alert("Checkbox is checked......" + $(this).attr("id"));

    }
  });

});

// AJAX function to find the recipe, and redirect users to recipePage.html
function findRecipe() {   
  event.preventDefault();
  console.log('$("#search").val() === ' + $("#search").val());

  let edamamURL = "https://api.edamam.com/search?q=" + $("#search").val() + "&app_id=29622eed&app_key=898538197a883e8c6561872a165ee750";

  $.ajax({
    url: edamamURL,
    method: "GET"
  }).then( function(response) {

    let arr = [];
    if (response.q === "")
    {
      alert ("You've reached your ajax query limit. You won't be able to do any search anymore!");
    }
    else {
      arr.push($("#search").val());
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

// the function to create the recipe, and redirect users to locationPage.html
function findMap() {   
  event.preventDefault();

  let edamamURL = "https://api.edamam.com/search?q=" + $("#search").val() + "&app_id=29622eed&app_key=898538197a883e8c6561872a165ee750";

  $.ajax({
    url: edamamURL,
    method: "GET"
  }).then( function(response) {
    console.lget(response);

    let arr = [];
    if (response.q === "")
    {
      alert ("You've reached your ajax query limit. You won't be able to do any search anymore!");
    }
    else {
      arr.push($("#search").val());
      for (let i = 0; i < 10; i++) {
        arr.push({
          label: response.hits[i].recipe.label,
          ingredients: response.hits[i].recipe.ingredientLines,
          url: response.hits[i].recipe.shareAs
        });
      }
    }

    localStorage.setItem("recipe", JSON.stringify(arr));
    $(window).attr("location", "locationPage.html");  // this is to direct users to the locationPage.html

  });

}