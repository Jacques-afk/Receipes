
const APIKEY = "63db64973bc6b255ed0c456e";
const user = localStorage.getItem("Username")
const feedback = document.querySelector('.message')

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
$('.quicky').click(function(e){    
  localStorage.setItem("Category", "quick")
  window.location.href = "searchresults.html";
});

$('.favouritedALOT').click(function(e){    
  localStorage.setItem("Category", "favourite")
  window.location.href = "searchresults.html";
});

$('.fusion').click(function(e){    
  localStorage.setItem("Category", "fusionnn")
  window.location.href = "searchresults.html";
});

$('.latest').click(function(e){    
  localStorage.setItem("Category", "latestest")
  window.location.href = "searchresults.html";
});

feedback.addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
  event.preventDefault();

  alert("Your message has been sent!");
  window.location.href = "homepage.html";
  }

});




// const menu = document.querySelector('#mobilemenu');
// const menulink = document.querySelector('.nav-links');

// menu.addEventListener('click', function() {
//     menu.classList.toggle('is-active');
//     menulink.classList.toggle('active');
// })


