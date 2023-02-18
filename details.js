//enters the details for the page

const comment_Bar = document.querySelector('.comment');
const postName = localStorage.getItem("Dishnamey");
const user = localStorage.getItem("Username")
console.log(postName)

const APIKEY = "63db64973bc6b255ed0c456e"; 

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

function postObject(callback){

    var settings = {    //get posts details targetted by dishname
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
    
    $.ajax(settings).done(function (posts) { 
        targetted_post = null;
    
        for (let i = 0; i < posts.length; i++){
            console.log(posts[i].NameDish)
            console.log(postName)
            if (posts[i].NameDish == postName){
                console.log('post found in database')
                targetted_post = posts[i];
                console.log(targetted_post)
            }
        }
        callback(targetted_post)  
    });
}

function getData(callback){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tutorial-9477.restdb.io/rest/postcheck",
        "method": "GET",
        "headers": {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache"
        }
    }
    
    $.ajax(settings).done(function (response){  

        check = null;
        id = 0;
        checkid = ''

        for (let i = 0; i < response.length; i++){  //goal of this is to extract data of post entered 

            if ((response[i].User == user) && (response[i].NameDish == postName)) {  //if user dishname data == dishname data from local stroage(meaning has encountered this bfore)

                check = true;
                id = [i];
                checkid = response[i]._id;
                }
                else{
                    check = false;
                    id = [i]
                }
            }

        console.log(check)

        if (check == false){   //if the user has not visted the post before,create fields
            console.log('new user!')
                
            var jsondata = {
                "NameDish": postName,
                "User": user,
                "LikeCheck": false,
                };

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://tutorial-9477.restdb.io/rest/postcheck",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": APIKEY,
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(jsondata)
                }

            $.ajax(settings).done(function (usernewdata) {
                let dishname = usernewdata.NameDish;
                let User = user;                              //creating data
                let LikeCheck = usernewdata.LikeCheck;
                callback(dishname, User, LikeCheck, checkid)
            });    
        }
            else{
                console.log('user found')
                let dishname = response[id].NameDish           //if it finds, read value and put in variable
                let User = Username
                let LikeCheck = response[id].LikeCheck
                callback(dishname, User, LikeCheck, checkid) 
            }
    });
}

postObject(function(post){     //updating the text on the post
    console.log(post)

    let titleofpost = post.NameDish;
    let authorofpost = post.Author;
    let dateofpost = post.Date_of_Post;
    let duration = post.Time;
    let descriptionofpost = post.Description;
    let numberoflikes = post.Likes;
    let numberfofdisllikes = post.Dislikes;
    let numberofcomments = post.Comments_No;
    let photodisplaying = post.Photo[0]
    let ingredientsofpost = post.Ingredients;
    let stepsofpost = post.Steps;
    let cateyOMG = post.Category;
    
    $('.imageofPost').html("<img class=imageofPost src=https://tutorial-9477.restdb.io/media/" + photodisplaying + ">")
    $('.namedafood').text(titleofpost);
    $('.Posted_Author').text('Posted by: ' + authorofpost);
    $('.Posted_Date').text('Posted on: ' + dateofpost);
    $('.Posted_Duration').text('Duration: ' + duration + ' Minutes');
    $('.description').text(descriptionofpost);
    $('.likes').text(numberoflikes);
    $('.dislikes').text(numberfofdisllikes);
    $('.comments').text(numberofcomments);
    $('.ingre').text(ingredientsofpost);
    $('.steps').text(stepsofpost);

    if (cateyOMG == 'Chinese'){
        displaycatey = "Category: Chinese";
    }
        else if (cateryOMG == 'Italian'){
            displaycatey = 'Category: Italian';
        }

        else if (cateryOMG == 'Western'){
            displaycatey = 'Category: Western';
        }

        else if (cateryOMG == 'Vietnamese'){
            displaycatey = 'Category: Vietnamese';
        }

    $('.categorydisplayed').text(displaycatey)
})

$('.likebutton').click(function(e){ 
    getData(function(dishname, User, LikeCheck, checkid){
        let RecipeName = dishname;
        let Reader = User;
        let LikeStatus = LikeCheck;
        let CheckObjectID = checkid;

        var settings = {    //get posts details
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
    
        postObject(function(post){
            console.log(post)
            
            console.log('button pressed')

            let like = post.Likes
            let objectid = post._id
            //the like checker is alr defined so no need define again

            if (LikeStatus == false){
                console.log('post has not been liked before')
                var changelikes = {
                    "Likes": (like + 1),
                }
                var changebool = {
                    "LikeCheck": true,
                }
            }
                else{
                    console.log('post has been liked before')
                    var changelikes = {
                        "Likes": (like - 1),
                    }
                    var changebool = {
                        "LikeCheck": false,
                    } 
                }
            
            var settings = {     //updating post details for like
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
                "data": JSON.stringify(changelikes)
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
            });

            var settings = {     //updating post details for like
                "async": true,
                "crossDomain": true,
                "url": "https://tutorial-9477.restdb.io/rest/postcheck/" + CheckObjectID,
                "method": "PUT",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": APIKEY,
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(changebool)
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
            });


        })

    });
});

comment_Bar.addEventListener("keypress", function(event) {

    postObject(function(post){

        let titleofpost = post.NameDish;
        let authorofpost = post.authorofpost;

        if (event.key === "Enter") {
            event.preventDefault();
        
            var feedback = $('.comment').val(); //whatever the user typed
            console.log(feedback)
    
            var newcomment = {
                "NameofDish": titleofpost,
                "AuthorofDish": authorofpost,
                "Comment": feedback,
                "CommenterName": Username,
            }   
    
                var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://tutorial-9477.restdb.io/rest/comments",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": APIKEY,
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(newcomment)
                }
    
                $.ajax(settings).done(function (response) {
                console.log(response);
                });
    
            }
    })

    
})











