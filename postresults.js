
// do functions for categories and search 

const APIKEY = "63db64973bc6b255ed0c456e";                      
let counter = 0;

function ButtonLink(callback){
    console.log('create')
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tutorial-9477.restdb.io/rest/recipesposts",
        "method": "GET",
        "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
        }
    }
    
    $.ajax(settings).done(function (response) {
        for (let i = 0; i < response.length; i++){
            let time = response[i].Time;
            if (time == 5){
                console.log('found a post captain');
                let post = response[i];
                callback(post)
            }
        }
    });
}


ButtonLink(function(post){
    console.log(post);

    let NameOfDish = post.NameDish;
    let Author = post.Author;
    let photoSRC = post.Photo[0]
    console.log(photoSRC)

    $("<div class=Dish><h2 class=DishName>" + NameOfDish + "</h2><h1 class=Author_Dish>" + Author + "</h1> <img src=https://tutorial-9477.restdb.io/media/" + photoSRC + "> style=width:104px;height:142px;> <button class=Go" + counter + ">button</button></div>").insertAfter("br.start");
    console.log("One dish done");
    counter += 1;
    console.log(counter);

    $('button').click(function(o){
        let classy = $(this)[0].className;

        let targetted_div = ($("." + classy).parent()[0]);   
        let targetted_dishname = targetted_div.children[0].innerText;
        let targetted_authorname = targetted_div.children[1].innerText;
        localStorage.setItem("Dishname", targetted_dishname);
        window.location.href = "recipedetails.html";              
    })

})

