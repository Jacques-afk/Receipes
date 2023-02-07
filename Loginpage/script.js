
$(document).ready(function (){
    const APIKEY = "63db64973bc6b255ed0c456e";              

    $('#login_Btn').click(function(e){
        e.preventDefault();
        //console.log("hello")
        let login_Username = $("#login_Username").val();
        let login_Password = $('#login_Password').val();

        let particulars = {
            "Username": login_Username,
            "Password":login_Password,       
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
            console.log("user identified")
            if (check_pass == login_Password){
              console.log("Correct password :)")
            }
          }
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
        }
        
      });


      }) //end button function
  })// end api function
        


