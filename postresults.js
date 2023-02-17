
// do functions for categories and search 

const APIKEY = "63db64973bc6b255ed0c456e";                      
let counter = 0;
let category_Search = localStorage.getItem("Category");
let manual_Search = localStorage.getItem("Dishs");
const user = localStorage.getItem("Username");
console.log(manual_Search);

function pointsupdater(){

    var total_points = 0;
  
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
  
    $.ajax(settings).done(function (response) {   //checking which posts are by the current logged in user
  
      for (let i = 0; i < response.length; i++){   
        post_author = response[i].Author;
  
        if (user == post_author){
          console.log("Current user in session is " + user)
          let post_likes = response[i].Likes;
  
          let starter = 0;
          let award_5 = 0;
          let award_10 = 0;
  
          if (post_likes >= 2){
            starter += 5;
          }
  
          if (post_likes > 5){
            let remain1 = post_likes % 5;
            let final1 = post_likes - remain1;
            let total_5 = final1 / 5 ;
  
            let result_5 = total_5 * 5;
            award_5 += result_5;
          }
  
          if (post_likes > 10){
            let remain2 = post_likes % 10;
            let final2 = post_likes - remain2;
            let total_10 = final2 / 10;
  
            let result_10 = total_10 * 2;
            award_10 += result_10;
          }
  
          let tally = award_5 + award_10 + starter;
  
  
          total_points += tally;
        }
      }  //outside the for loop
      console.log(total_points)
  
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tutorial-9477.restdb.io/rest/receipesprofiles",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
      }
    
      $.ajax(settings).done(function (response) {
        for (let i = 0; i < response.length; i++){
    
          if (response[i].Username == user){
            console.log('userfound');
    
            let userid = response[i]._id;
            let UsernameFOR = response[i].Username;
            let PasswordFOR = response[i].Password;
            let EmailFOR = response[i].Email;
            
            var jsondata = {"Username": UsernameFOR,
                      "Password": PasswordFOR,
                      "Email": EmailFOR,
                      "Points": total_points,
                      };
    
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://tutorial-9477.restdb.io/rest/receipesprofiles/" + userid,
              "method": "PUT",
              "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
              },
              "processData": false,
              "data": JSON.stringify(jsondata)
            }
    
            $.ajax(settings).done(function (response) {
              console.log(response);
            });
    
            $('.currency').text(total_points)
    
          }
        }
      });
    });
  }
    
pointsupdater();
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
            if (time == "5-10"){
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
            
            let likeyy = response[i].Likes;
            let averagelikes = 1;                         //change this value based on average 

            if (likeyy >= averagelikes){
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

function getfusionrecipes(callback){
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
            if (time == "5-10"){
                console.log('found a post captain');
                let post = response[i];
                callback(post)
            }
        }
    });
}

function fusionrecipes(){
    getfusionrecipes(function(post){
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

//////////////////////////////////////////////////////////////////

function getlatestrecipes(callback){
    // console.log('create')
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
    
    let today = new Date();

    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let todaydate = today.getDay() + 12;
    console.log(todaydate)
                                                                       //today date -7 give it a span of a week
    $.ajax(settings).done(function (response) {
        for (let p = 0; p < response.length; p++){

            let dateyposty = response[p].Date_of_Post;
            let date = dateyposty.split("/")[0];                        //the day date of the current day
            console.log(date)

            let re_str = (todaydate - 7);                               // today is the 18th, so from 11-18 (range)

            for (let i = re_str; i <= date; i++){                       //i is 11, as long as 10 <= 17, i go up each time

                if (i == date){                                         // i is checking thro the range going up
                    console.log('found a post captain');
                    let post = response[p];
                    callback(post)
                }
                    else{
                        console.log('no new dates')
                    }
            }
        }   
    });
}
    
function latestrecipes(){
    getlatestrecipes(function(post){
        console.log(post);
    
        let NameOfDish = post.NameDish;
        let Author = post.Author;
        let photoSRC = post.Photo[0]
        let categoryforicon = post.Category;
        console.log(photoSRC);
    
        $("<div class=Dish><h2 class=DishName" + counter + ">" + NameOfDish + "</h2><h1 class=Author_Dish>" + Author + "</h1> <img class=JAJABINKS src=https://tutorial-9477.restdb.io/media/" + photoSRC + "><button class=Go" + counter + ">button</button> <img class=iconcategory src=/" + categoryforicon + ".png> </div>").insertAfter(".gobacklink");
        console.log("One dish done");
        
        let colorstyle = '';

        if (categoryforicon == 'Chinese'){
            colorstyle = 'red';
        }
            else if (categoryforicon == 'Western'){
                colorstyle = '#2E1503';
            }
            else if (categoryforicon == 'Vietnamese'){
                colorstyle = 'orange';
            }
            else if (categoryforicon == 'Italian'){
                colorstyle = 'green';
            }

        $('.Dish').css({
            'background-color': 'grey',
        })
        $('.DishName' + counter).css({
            'color': colorstyle,
        })
        $('.Go' + counter).css({
            'background-color': colorstyle,
            'color': 'white',
        })
        counter += 1;

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

/////////////////////////////////////////////////////////////////////////////

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
    console.log('calling quick')
    quickrecipes();
}
    else if (category_Search == "favourite"){
        console.log('calling fav')
        favouriterecipes();
    }   
    else if (category_Search == "fusionnn"){
        console.log('fus')
        fusionrecipes();
    }
    else if (category_Search == "latestest"){
        console.log('new')
        latestrecipes();
    }
    else if (category_Search == "chinese"){
        console.log('chin')
        chineserecipes();
    }
    else if (category_Search == "western"){
        console.log('wester')
        westernrecipes();
    }
    else if (category_Search == "vietnamese"){
        console.log('viet')
        vietnameserecipes();
    }
    else if (category_Search == "italian"){
        console.log('ital')
        italianrecipes();
    }
    else if (manual_Search.length >= 1){
        console.log('searchbr')
        searchbar();
    }
