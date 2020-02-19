let array = JSON.parse(localStorage.getItem("recipe"));

$(document).ready(function(){
    console.log("yippie!!");

    for (let i = 0; i<array.length; i++) {
        let div1 = $("<div>").addClass("col s5");

        let card = $("<div>").addClass("card");
        card.append($("<div>").addClass("card-image waves-effect waves-block waves-light").append("<img>").addClass("activator").attr("src", ""));

        let cardContent = $("<div>").addClass("card-content");
        cardContent.append($("<span>").addClass("card-title activator grey-text text-darken-4").text(array[i].label)).append($("<i>").addClass("material-icons right").text("more_vert"));
        cardContent.append($("<p>"));
        cardContent.append($("<a>").addClass("theURL").attr("href", array[i].url).text("See complete recipe"));
        card.append(cardContent);

        let cardReveal = $("<div>").addClass("card-reveal");
        cardReveal.append($("<span>").addClass("card-title grey-text text-darken-4").text("Recipe").append($("<i>").addClass("material-icons right").text("close")));
        cardReveal.append($("<span>").text(array[i].ingredients));
        
        //----------- EL: attempt to separate ingredients into lines --------//
        // let newSpan = $("<span>");
        // const eacher = function(collection) {            
        //     for (let i = 0; i < collection.length; i++) {
        //         newSpan.text(collection[i], i, collection);
        //         cardReveal.append(newSpan);

        //         console.log(collection[i]);
        //     }
        // };
        // eacher(array[i].ingredients);
        // cardReveal.append(newSpan);

        
        cardReveal.append($("<p>").text("placeholder"));
        card.append(cardReveal);

        div1.append(card);
        $(".row").append(div1);
    }
{/* <div class="col s5">
        <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">recipes<i class="material-icons right">more_vert</i>
                </span>
                <p></p>
                <a href="https://www.google.com">This is a link</a></p> 
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                <p>placeholder</p>
            </div>
        </div>
</div> */}

});