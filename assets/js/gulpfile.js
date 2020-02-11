  $(document).ready(function(){
    //$('.fixed-action-btn').floatingActionButton();
      // adding test comment
    
    let searchInput = $("#search");
    console.log("searchInput ======" + searchInput);

    
    let edamamURL = "https://api.edamam.com/search?q=" + searchInput + "&app_id=29622eed&app_key=898538197a883e8c6561872a165ee750"

    $.ajax({
      url: edamamURL,
      method: "GET"
    }).then( function(response) {
      console.log("inside edamam's ajax");
      console.log(response);
    });



  });
        