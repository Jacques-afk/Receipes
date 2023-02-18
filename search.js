
const APIKEY = '63db64973bc6b255ed0c456e';
const search_Bar = document.querySelector('.searchhh')
const user = localStorage.getItem("Username")

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
//section for if they press the cultural food categories//

$('.chineseman').click(function(e){
  localStorage.setItem("Category", "chinese")
  window.location.href = "searchresults.html"
})

$('.westernman').click(function(e){
  localStorage.setItem("Category", "western")
  window.location.href = "searchresults.html"
})

$('.vietnamman').click(function(e){
  localStorage.setItem("Category", "vietnamese")
  window.location.href = "searchresults.html"
})

$('.italianman').click(function(e){
  localStorage.setItem("Category", "italian")
  window.location.href = "searchresults.html"
})

//section for if they search via the search bar//

search_Bar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();

      var search_Response = $('.searchhh').val(); //whatever the user typed
      let final_search = search_Response.toUpperCase();

      // $('.seatch').click();
      console.log('enter pressed');

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
    
        let replieddishes = []

        for (let i = 0; i < response.length; i++){

            
            let nameofpost = response[i].NameDish;
            
            let final_found = nameofpost.toUpperCase();
            console.log(final_found)

            if (final_found == final_search){
              console.log(nameofpost + 'is a match')
              replieddishes.push(nameofpost);
            }
        }
        
        if (replieddishes.length > 0){
          localStorage.setItem("Dishs", replieddishes);
          window.location.href = "searchresults.html";
        }
          else{
            alert("No dishes have been found with the name");
            window.location.href = "explore.html";
          }

      });
     }
}); //end of search event



