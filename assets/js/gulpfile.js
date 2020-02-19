$(document).ready(function(){
  
  $(document).on('keypress',function(e) {
    if(e.which == 13) {
      event.preventDefault();
      let searchInput = $("#search").val();
      console.log("searchInput ====== " + searchInput);
      console.log(e);

      let edamamURL = "https://api.edamam.com/search?q=" + searchInput + "&app_id=29622eed&app_key=898538197a883e8c6561872a165ee750";
  
      $.ajax({
        url: edamamURL,
        method: "GET"
      }).then( function(response) {
        console.log("inside edamam's ajax");
        console.log(response);

        let arr = [];
        for (let i = 0; i < 10; i++) {
          arr.push({
            label: response.hits[i].recipe.label,
            ingredients: response.hits[i].recipe.ingredientLines,
            url: response.hits[i].recipe.shareAs
          });
          // console.log(arr[i].label + ", " + arr[i].ingredients + ", " + arr[i].url);
        }

        localStorage.setItem("recipe", JSON.stringify(arr));
        $(window).attr("location", "recipePage.html");  // this is to direct users to the recipePage.html

        // mapIt(searchInput);
      });

    }
    
  });

      

  function mapIt (input) {
    let placeURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + input + "&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY";

    $.ajax( {
      url: placeURL,
      method: "GET"
    }).then (function(response) {
      console.log("inside Google Place");
      console.log(response);



      $(window).attr("location", "locationPage.html");  // this is to direct users to the recipePage.html

    });
  }


  });
        