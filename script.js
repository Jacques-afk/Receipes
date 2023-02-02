
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

        /*let settings = {
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
        console.log(response);
      });*/

      let settings = {                                  //getting info
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
        console.log(response);
      });


      }) //end button function
  })// end api function
        
