
$(document).ready(function (){
    const APIKEY = "63db64973bc6b255ed0c456e";         
    
    let today = new Date();

    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = today.getDay() + 12;

    let current_date = `${date}/${month}/${year}`

    $('#login_Btn').click(function(e){    //java for log in page
        e.preventDefault();
        //console.log("hello")
        let login_Username = $("#login_Username").val();
        let login_Password = $('#login_Password').val();
        
        let particulars = {
            "Username": login_Username,
            "Password": login_Password,       
        };

      let settings = {                                 
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
      
      
      $.ajax(settings).done(function (response) {   //response = data received from server of contacts

        for (let i = 0; i < response.length; i++){
          let check_user = response[i].Username
          let check_pass = response[i].Password
   
          if (check_user == login_Username){
            console.log("user identified"); 
            if (check_pass == login_Password){     
              localStorage.setItem('Username', login_Username);
              window.location.href = "homepage.html"; 
            }
              else{
                alert("User not Found");
              }
          } 
        }

      })                  
    }); //end of java for log in page

    $('#create_Btn').click(function(e){      //java for create acc page
       e.preventDefault();
       //console.log("hello")

      let create_Username = $(".create_User").val();
      let create_Email = $(".create_Email").val();
      let create_Password = $('.create_Pass').val();
      let create_ConfirmPassword = $('.create_PassCfm').val();

      let particulars = {
          "Username": create_Username,
          "Password":create_Password,
          "Email": create_Email,
          "Points": 0,
          "dateJoined": current_date

      };

      let cart = {
        "User": create_Username,
        "Cup": 0,
        "Plate": 0,
        "Cooker": 0,
        "Blender": 0
      }

      if (create_Password == create_ConfirmPassword){
          console.log("passwords match <3")

          let settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://tutorial-9477.restdb.io/rest/receipesprofiles",
              "method": "POST",
              "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
              },
              "processData": false,
              "data": JSON.stringify(particulars)
          }

          $.ajax(settings).done(function (response) {
            
            var shop = {
              "async": true,
              "crossDomain": true,
              "url": "https://tutorial-9477.restdb.io/rest/shopping",
              "method": "POST",
              "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
              },
              "processData": false,
              "data": JSON.stringify(cart)
            }
  
            $.ajax(shop).done(function (response) {
              localStorage.setItem('Username', create_Username);
              window.location.href = "homepage.html";
            });

          });      
          // $("#jesus").click(function(r){
          //   r.preventDefault()
          //   $("#create_animation").get(0).play();
          // })

      } // if they succesfully created an acc
    })
    
    

})// end api function
        


