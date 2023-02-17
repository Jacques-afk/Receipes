
// do functions for categories and search 

const APIKEY = "63db64973bc6b255ed0c456e";                      
let counter = 0;
let category_Search = localStorage.getItem("Category");
let manual_Search = localStorage.getItem("Dishs");
console.log(manual_Search);


function getquickrecipes(callback){
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

function quickrecipes(){
    getquickrecipes(function(post){
        console.log(post);
    
        let NameOfDish = post.NameDish;
        let Author = post.Author;
        let photoSRC = post.Photo[0]
        let categoryforicon = post.Category
        console.log(photoSRC)
    
        $("<div class=Dish><h2 class=DishName>" + NameOfDish + "</h2><h1 class=Author_Dish>" + Author + "</h1> <img class=JAJABINKS src=https://tutorial-9477.restdb.io/media/" + photoSRC + "><button class=Go" + counter + ">button</button> <img class=iconcategory src=/" + categoryforicon + ".png> </div>").insertAfter(".gobacklink");
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
} 

function getfavouriterecipes(callback){
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
            
            let foodcategory = response[i].Category;


            if (foodcategory == "Vietnamese"){
                console.log('found a post captain');
                let post = response[i];
                callback(post)
            }
        }
    });
}

function favouriterecipes(){
    getfavouriterecipes(function(post){
        console.log(post);
    
        let NameOfDish = post.NameDish;
        let Author = post.Author;
        let photoSRC = post.Photo[0]
        console.log(photoSRC)
    
        $("<div class=Dish><h2 class=DishName>" + NameOfDish + "</h2><h1 class=Author_Dish>" + Author + "</h1> <img class=JAJABINKS src=https://tutorial-9477.restdb.io/media/" + photoSRC + "><button class=Go" + counter + ">button</button></div>").insertAfter(".gobacklink");
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
}

///////////////////////////////////////////////////////////


function getchineserecipes(callback){
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
            
            let foodcategory = response[i].Category;
            if (foodcategory == "Chinese"){
                console.log('found a post captain');
                let post = response[i];
                callback(post)
            }
        }
    });
}

function chineserecipes(){
    getchineserecipes(function(post){
        console.log(post);
    
        let NameOfDish = post.NameDish;
        let Author = post.Author;
        let photoSRC = post.Photo[0]
        console.log(photoSRC)
    
        $("<div class=Dish><h2 class=DishName>" + NameOfDish + "</h2><h1 class=Author_Dish>" + Author + "</h1> <img class=JAJABINKS src=https://tutorial-9477.restdb.io/media/" + photoSRC + "><button class=Go" + counter + ">button</button></div>").insertAfter(".gobacklink");
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
} 

///////////////////////////////////////////////////////////


function getwesternrecipes(callback){
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
            
            let foodcategory = response[i].Category;
            if (foodcategory == "Western"){
                console.log('found a post captain');
                let post = response[i];
                callback(post)
            }
        }
    });
}

function westernrecipes(){
    getwesternrecipes(function(post){
        console.log(post);
    
        let NameOfDish = post.NameDish;
        let Author = post.Author;
        let photoSRC = post.Photo[0]
        console.log(photoSRC)
    
        $("<div class=Dish><h2 class=DishName>" + NameOfDish + "</h2><h1 class=Author_Dish>" + Author + "</h1> <img class=JAJABINKS src=https://tutorial-9477.restdb.io/media/" + photoSRC + "><button class=Go" + counter + ">button</button></div>").insertAfter(".gobacklink");
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
} 

///////////////////////////////////////////////////////////


function getitalianrecipes(callback){
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
            
            let foodcategory = response[i].Category;
            if (foodcategory == "Italian"){
                console.log('found a post captain');
                let post = response[i];
                callback(post)
            }
        }
    });
}

function italianrecipes(){
    getitalianrecipes(function(post){
        console.log(post);
    
        let NameOfDish = post.NameDish;
        let Author = post.Author;
        let photoSRC = post.Photo[0]
        console.log(photoSRC)
    
        $("<div class=Dish><h2 class=DishName>" + NameOfDish + "</h2><h1 class=Author_Dish>" + Author + "</h1> <img class=JAJABINKS src=https://tutorial-9477.restdb.io/media/" + photoSRC + "><button class=Go" + counter + ">button</button></div>").insertAfter(".gobacklink");
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
} 

///////////////////////////////////////////////////////////


function getvietnameserecipes(callback){
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
            
            let foodcategory = response[i].Category;
            if (foodcategory == "Vietnamese"){
                console.log('found a post captain');
                let post = response[i];
                callback(post)
            }
        }
    });
}

function vietnameserecipes(){
    getvietnameserecipes(function(post){
        console.log(post);
    
        let NameOfDish = post.NameDish;
        let Author = post.Author;
        let photoSRC = post.Photo[0]
        console.log(photoSRC)
    
        $("<div class=Dish><h2 class=DishName>" + NameOfDish + "</h2><h1 class=Author_Dish>" + Author + "</h1> <img class=JAJABINKS src=https://tutorial-9477.restdb.io/media/" + photoSRC + "><button class=Go" + counter + ">button</button></div>").insertAfter(".gobacklink");
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
} 



function searchbar(){
    console.log(manual_Search)

    let listof_dishes = manual_Search.split(",")
    

    for (let i = 0; i < (listof_dishes.length); i++){

        function getting (callback){
            let NameOfDishFound = listof_dishes[i];

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
                    if (response[i].NameDish == NameOfDishFound){
                        console.log('dish found in database')

                        let NameofDishT = response[i].NameDish;
                        let AuthorT = response[i].Author; 
                        let photoSRCT = response[i].Photo[0]
                
                        callback(NameofDishT, AuthorT, photoSRCT)
                    }
                }
            });
        }
        
        getting(function(NameDishT, AuthorT, photoSRCT){
            $("<div class=Dish><h2 class=DishName>" + NameDishT + "</h2><h1 class=Author_Dish>" + AuthorT + "</h1> <img class=JAJABINKS src=https://tutorial-9477.restdb.io/media/" + photoSRCT + "><button class=Go" + counter + ">button</button></div>").insertAfter(".gobacklink");
            console.log("One dish done");
            counter += 1;
            console.log(counter);
        
            $('button').click(function(o){
                let classy = $(this)[0].className;
        
                let targetted_div = ($("." + classy).parent()[0]);   
                let targetted_dishname = targetted_div.children[0].innerText;
                let targetted_authorname = targetted_div.children[1].innerText;
                localStorage.setItem("Dishnamey", targetted_dishname);
                window.location.href = "recipedetails.html";              
            })
        })





    }
};






if (category_Search == "quick"){
    quickrecipes();
    localStorage.removeItem("Category")
}
    else if (category_Search == "favourite"){
        favouriterecipes();
        localStorage.removeItem("Category")
    }   
    else if (category_Search == "fusion"){
        fusionrecipes();
        localStorage.removeItem("Category")
    }
    else if (category_Search == "latest"){
        latestrecipes();
        localStorage.removeItem("Category")
    }
    else if (category_Search == "chinese"){
        chineserecipes();
        localStorage.removeItem("Category")
    }
    else if (category_Search == "western"){
        westernrecipes();
        localStorage.removeItem("Category")
    }
    else if (category_Search == "vietnamese"){
        vietnameserecipes();
        localStorage.removeItem("Category")
    }
    else if (category_Search == "italian"){
        italianrecipes();
        localStorage.removeItem("Category")
    }
    else if (manual_Search.length >= 1){
        searchbar();
    }
