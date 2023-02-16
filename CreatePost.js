
//search results and create post

const user = localStorage.getItem("Username")
console.log(user)

const APIKEY = "63db64973bc6b255ed0c456e";

let today = new Date();

let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = today.getDay() + 12;

let current_date = `${date}-${month}-${year}`
console.log(current_date);


$(document).ready(function (){  
    
  $('#createpost_Bt').click(function(e){    //java for log in page

      console.log('running')
      e.preventDefault();
      let dish = $(".create_Dish").val();
      let category = $('#category').val();
      let time = $('#slct').val();
      let descri = $('.descdish').val();
      let ingre = $('.ingredientdish').val();
      let steps = $('.stepdish').val();
      let image_dish = $("#imguploadbtn").val();
      let likes = 0;
      let dislikes = 0;
      let comment_number = 0;
      let poster = user; // current user 
      let checkLike = false;
      let date = current_date;

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
          "CheckLike": checkLike
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
                    let photoCode = post.Photo

                    $("<div class=Dish><h2 class=Dish>" + NameOfDish + "</h2><h1 class=Author_Dish>" + Author + "</h1></div>").insertAfter("br.start");
                    console.log("One dish done")
                }
            }
          });

    });




    // $('#change').click(function(e){  //like button represent 

    //   //let user = localstorage.getitem(username)
    //   //get data base of the new collection
    //   //if username is not in the new collection, create field data for it
    //   //get data of the user
    //   // user(info) dishname(info)(passed thro prev html) likecheck(info) dislikecheck(info)

    //   //with dishname(info), for loop all posts in postrecipescollection to find specific FOR LIKE AND DISLIKE NUMBER VALUE
    //   //if he clicks the like button, runs function
    //   //get likecheck boolean and if its ____, change the the number for the whole colelction



    //   var settings = {    //get posts details
    //       "async": true,
    //       "crossDomain": true,
    //       "url": "https://tutorial-9477.restdb.io/rest/recipesposts",
    //       "method": "GET",
    //       "headers": {
    //         "content-type": "application/json",
    //         "x-apikey": APIKEY,
    //         "cache-control": "no-cache"
    //       }
    //   }
        
    //   $.ajax(settings).done(function (posts) {

    //     let like = posts[2].Likes; //display number of likes
    //     let objectid = posts[2]._id;
    //     let like_Check = posts[2].CheckLike; //bool value

    //     // if check == false means post has not been liked, giving it the option to be liked!
  
    //     if (like_Check == false){
    //       console.log('no like before')
    //       var change = {
    //         "Likes": (like + 1),
    //         "CheckLike": true,
    //       };                 
    //     }
    //       else {
    //         console.log('like before')
    //         var change = {
    //           "Likes": (like -1),
    //           "CheckLike": false,
    //         }
    //       }     

    //     var settings = {     //updating post details for like
    //       "async": true,
    //       "crossDomain": true,
    //       "url": "https://tutorial-9477.restdb.io/rest/recipesposts/" + objectid,
    //       "method": "PUT",
    //       "headers": {
    //         "content-type": "application/json",
    //         "x-apikey": APIKEY,
    //         "cache-control": "no-cache"
    //       },
    //       "processData": false,
    //       "data": JSON.stringify(change)
    //     }

    //     $.ajax(settings).done(function (response) {
    //       console.log(response);
    //     });
    //   })
        
    // })

  
  
  let total_points = 0;

  function cal_points(callback){

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
  
        let current_User = user;
        post_author = response[i].Author;
        
        if (current_User == post_author){
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
  
          console.log(award_5);
          console.log(award_10);

          let final_award = award_5 + award_10 + starter;
          callback(final_award)
        }
      }
    });
  }

  cal_points(function(final_award){
    total_points += final_award;
    console.log(total_points)

  })



}); //end coding for document