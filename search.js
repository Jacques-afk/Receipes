
const APIKEY = '63db64973bc6b255ed0c456e';
const search_Bar = document.querySelector('.searchhh')

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

            if (final_found == final_search){
              replieddishes.push(nameofpost);
            }
        }

        localStorage.setItem("Dishs", replieddishes);
        window.location.href = "searchresults.html";

      });
     }
}); //end of search event



