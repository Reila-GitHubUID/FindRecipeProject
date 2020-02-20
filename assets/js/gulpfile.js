localStorage.setItem("recipe", "");
let $search = $("#search").val();

$(document).ready(function(){
  $(document).on('keypress',function(event) {
    event.preventDefault();  

    if ($search === "") {
      return;
    }
    else {
      if(event.which == 13) {
        findRecipe();
        $(window).attr("location", "recipePage.html");  // this is to direct users to the recipePage.html
      }
    }
  });

  
  $(".btn-large").click(function() {
    event.preventDefault();  

    if ($search === "") {
      return;
    }
    else {
      if ($(this).text() === "Dine-In") {  
        findRecipe(); 
        $(window).attr("location", "recipePage.html");  // this is to direct users to the recipePage.html
      
      }
      else if ($(this).text() === "Dine-Out") {
        findRecipe();
        $(window).attr("location", "locationPage.html");  // this is to direct users to the locationPage.html
      }
    }
  });

});

// AJAX function to find the recipe
function findRecipe() {   
  let edamamURL = "https://api.edamam.com/search?q=" + $search + "&app_id=29622eed&app_key=898538197a883e8c6561872a165ee750";

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
      arr.push(input);
      for (let i = 0; i < 10; i++) {
        arr.push({
          label: response.hits[i].recipe.label,
          ingredients: response.hits[i].recipe.ingredientLines,
          url: response.hits[i].recipe.shareAs
        });
      }
    }

      localStorage.setItem("recipe", JSON.stringify(arr));

  });

}