

const Username = localStorage.getItem("Username")

$('#change').click(function(e){  //like button represent
    console.log('button pressed');
    
    const APIKEY = "63db64973bc6b255ed0c456e"; 

    //let user = localstorage.getitem(username) DONE
    //get data base of the new collection DONE
    //if username is not in the new collection, create field data for it DONE
    //get data of the user DONE
    // user(info) dishname(info)(passed thro prev html) likecheck(info) dislikecheck(info) DONE

    //with dishname(info), for loop all posts in postrecipescollection to find specific FOR LIKE AND DISLIKE NUMBER VALUE
    //if he clicks the like button, runs function
    //get likecheck boolean and if its ____, change the the number for the whole colelction

    function getData(callback){

        console.log('function runs')

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

            for (let i = 0; i < response.length; i++){  //goal of this is to extract data of post entered 

                if (response[i].User == Username){
                    check = true;
                    }
                    else{
                        check = false;
                    }
                }

            console.log(check)

            if (check == false){   //if the user has not visted the post before,create fields
                console.log('new user!')
                    
                var jsondata = {
                    "NameDish": "Apple",
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
                    callback(dishname, User, LikeCheck)
                });    
            }


                else{
                    console.log('user found')
                    let dishname = response[1].NameDish           //if it finds, read value and put in variable
                    let User = Username
                    let LikeCheck = response[1].LikeCheck
                    callback(dishname) 
                }


        });
    }

    getData(function(dishname, User, LikeCheck){
        console.log(dishname);
    })

});
























//     var settings = {    //get posts details
//         "async": true,
//         "crossDomain": true,
//         "url": "https://tutorial-9477.restdb.io/rest/recipesposts",
//         "method": "GET",
//         "headers": {
//           "content-type": "application/json",
//           "x-apikey": APIKEY,
//           "cache-control": "no-cache"
//         }
//     }
      
//     $.ajax(settings).done(function (posts) {

//       let like = posts[2].Likes; //display number of likes
//       let objectid = posts[2]._id;
//       let like_Check = posts[2].CheckLike; //bool value

//       // if check == false means post has not been liked, giving it the option to be liked!

//       if (like_Check == false){
//         console.log('no like before')
//         var change = {
//           "Likes": (like + 1),
//           "CheckLike": true,
//         };                 
//       }
//         else {
//           console.log('like before')
//           var change = {
//             "Likes": (like -1),
//             "CheckLike": false,
//           }
//         }     

//       var settings = {     //updating post details for like
//         "async": true,
//         "crossDomain": true,
//         "url": "https://tutorial-9477.restdb.io/rest/recipesposts/" + objectid,
//         "method": "PUT",
//         "headers": {
//           "content-type": "application/json",
//           "x-apikey": APIKEY,
//           "cache-control": "no-cache"
//         },
//         "processData": false,
//         "data": JSON.stringify(change)
//       }

//       $.ajax(settings).done(function (response) {
//         console.log(response);
//       });
//     })
      
//   })