
$(document).ready(function (){
    const APIKEY = "63db64973bc6b255ed0c456e";  
    
    $('#login_Btn').click(function(e){    //java for log in page
        console.log('running')
        e.preventDefault();
        let dish = $("#namedish").val();
        let category = $('#category').val();
        let time = $('#time').val();
        let descri = $('#description').val();
        let ingre = $('#ingredients').val();
        let steps = $('#steps').val();
        let image_dish = $(".file-upload").val();
        let likes = 0;
        let dislikes = 0;
        let comment_number = 0;
        let poster = "the username data you transferred"

        let date = 2020-10-20 //find out how to get date
        
        let jsondata = {
            "NameDish": dish,
            "Category": category,
            "Time": time,
            "Description": descri,
            "Ingredients": ingre,
            "Steps": steps,
            "Photo": image_dish,
            "Likes": likes,
            "Dislikes": dislikes,
            "Comments_No": comment_number,
            "Author": poster,
            "Date_of_Post": date,
        };

      let settings = {                                 
        "async": true,
        "crossDomain": true,
        "url": "https://tutorial-9477.restdb.io/rest/recipesposts",
        "method": "POST",
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
 
    })  


    $('#find_Btn').click(function(e){
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
                    console.log('found a post captain')
                    let post = response[i];
                    
                    let NameOfDish = post.NameDish;
                    let Author = post.Author;

                    $("<div class=Dish><h2 class=Dish>" + NameOfDish + "</h2><h1 class=Author_Dish>" + Author + "</h1></div>").insertAfter("br.start");
                    console.log("One dish done")
                }
            }
          });

    })

    var click_Check = true;
    $('#change').click(function(e){

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
            let like = response[1].Likes;
            let objectid = response[1]._id;

            if (click_Check == true){
              var change = {
                "Likes": (like + 1),
              };
              click_Check = false;
            }

              else{
                var change = {
                  "Likes": (like - 1),
                };
                click_Check = true;
                
              }

            console.log(click_Check);

            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://tutorial-9477.restdb.io/rest/recipesposts/" + objectid,
              "method": "PUT",
              "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
              },
              "processData": false,
              "data": JSON.stringify(change)
            }

            $.ajax(settings).done(function (response) {
              console.log(response);
            });
          })
        
    })





})

