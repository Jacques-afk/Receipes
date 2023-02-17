
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
  console.log('loaded') 
    
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
 
  });  


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
        let current_User = user;
        post_author = response[i].Author;

        if (current_User == post_author){
          let post_likes = response[i].Likes;
          let post_comments = response[i].Comments_No

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
    });
    
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
  }
    
  pointsupdater();

  
  




 

}); //end coding for document