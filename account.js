
const APIKEY = "63db64973bc6b255ed0c456e";
const user = localStorage.getItem("Username")

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
            console.log('user found')

            $('.BIGTITLE').text(user)
            $('.DATEJOINED').text("Joined on: " + response[i].dateJoined)

            $('.first').text(user)
            $('.second').text('Jacques Tan Brandon Hao')
            $('.third').text(response[i].Email)
            $('.fourth').text('9795 0989')
            $('.fifth').text(response[i].Password)

        }
    }
  });