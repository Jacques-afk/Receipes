
$(document).ready(function (){
    const APIKEY = "63db64973bc6b255ed0c456e";              

    $('#btn_Submit').click(function(e){
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
            "Points": 0
        };


        if (create_Password == create_ConfirmPassword){
            console.log("passwords match <3")

            var settings = {
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
        }
           
        
    
      $.ajax(settings).done(function (response) {
        console.log(response);
      });


    })
})