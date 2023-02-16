
//enters the details for the page

$(document).ready(function (){

    const Username = localStorage.getItem("Username"); //current user in session
    // const postName = localStorage.getItem("Dishname");
    const postName = "Laksa" 

    const APIKEY = "63db64973bc6b255ed0c456e"; 

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
        
                if (posts[i].NameDish == postName){
                    targetted_post = posts[i];
                }
            }
        
            // $('.value').text(targetted_post.Likes);  // the class to display the likes of the post gotten
            callback(targetted_post)
        
        
        });
    }


    //let user = localstorage.getitem(username) DONE
    //get data base of the new collection DONE
    //if username is not in the new collection, create field data for it DONE
    //get data of the user DONE
    // user(info) dishname(info)(passed thro prev html) likecheck(info) dislikecheck(info) DONE

    //with dishname(info), for loop all posts in postrecipescollection to find specific FOR LIKE AND DISLIKE NUMBER VALUE
    //if he clicks the like button, runs function
    //get likecheck boolean and if its ____, change the the number for the whole colelction

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
            id = 0
            checkid = ''

            for (let i = 0; i < response.length; i++){  //goal of this is to extract data of post entered 

                if ((response[i].User == Username) && (response[i].NameDish == postName)) {  //if user dishname data == dishname data from local stroage(meaning has encountered this bfore)

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
                    "User": Username,
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
                    let dishname = usernewdata.NameDish
                    let User = Username                               //creating data
                    let LikeCheck = usernewdata.LikeCheck
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

        let titleofpost = post.NameDish
        let authorofpost = post.authorofpost
        let dateofpost = post.Date_of_Post
        let duration = post.Time
        let descriptionofpost = post.Description
        let numberoflikes = post.Likes
        let numberfofdisllikes = post.Dislikes
        let numberofcomments = post.Comments_No

        $('.namedafood').text(titleofpost);
        $('.Posted_Author').text('Posted by: ' + authorofpost);
        $('.Posted_Date').text('Posted on: ' + dateofpost);
        $('.Posted_Duration').text('Duration: ' + duration);
        $('.description').text(descriptionofpost);
        $('.likes').text(numberoflikes);
        $('.dislikes').text(numberfofdisllikes);
        $('.comments').text(numberofcomments);

    })

    $('.likebutton').click(function(e){ 
        getData(function(dishname, User, LikeCheck, checkid){
            let RecipeName = dishname;
            let Reader = User;
            let LikeStatus = LikeCheck;
            let CheckObjectID = checkid

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
});





