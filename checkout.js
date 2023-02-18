const APIKEY = "63db64973bc6b255ed0c456e";
const user = localStorage.getItem("Username")

let numberofcups = localStorage.getItem("cup_no");
console.log(numberofcups)
let numberofplates = localStorage.getItem("plate_no");
console.log(numberofplates)
let numberofcookers = localStorage.getItem("cooker_no");
console.log(numberofcookers)
let numberofblenders = localStorage.getItem("blender_no");
console.log(numberofblenders)

let priceCup = 560;
let pricePlate = 350;
let priceCooker = 1940;
let priceofBlender = 1200;

let picCup = "<div class=flex-img><div class=sketchfab-embed-wrapper> <iframe title=Cup_IP frameborder=0 allowfullscreen mozallowfullscreen=true webkitallowfullscreen=true allow=autoplay; fullscreen; xr-spatial-tracking xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src=https://sketchfab.com/models/8f2e59f30e274a33a7da3d0a9c5512b6/embed> </iframe> <p style=font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;> </p></div></div>";
let picPlate = "<div class=flex-img><div class=sketchfab-embed-wrapper> <iframe title=Dish_IP frameborder=0 allowfullscreen mozallowfullscreen=true webkitallowfullscreen=true allow=autoplay; fullscreen; xr-spatial-tracking xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src=https://sketchfab.com/models/3efcc39c756d4c7985bccbbabc0024c1/embed> </iframe> </div></div>"
let picCooker = "<div class=flex-img> <div class=sketchfab-embed-wrapper> <iframe title=blender frameborder=0 allowfullscreen mozallowfullscreen=true webkitallowfullscreen=true allow=autoplay; fullscreen; xr-spatial-tracking xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src=https://sketchfab.com/models/af7b36e4999b4718817c61c9451b6e9f/embed> </iframe></div> </div>"
let picBlender = "<div class=flex-img><div class=sketchfab-embed-wrapper> <iframe title=ricecooker frameborder=0 allowfullscreen mozallowfullscreen=true webkitallowfullscreen=true allow=autoplay; fullscreen; xr-spatial-tracking xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src=https://sketchfab.com/models/ec5265bb4b584038972fb049a4758f73/embed> </iframe></div> </div>"

let totalFee = (priceCup * numberofcups) + (pricePlate * numberofplates) + (priceCooker * numberofcookers) + (priceofBlender * numberofblenders);
console.log(totalFee);

if (numberofcups > 0){
    $("<div class=shoppingcart> <div class=everything>" + picCup + "<div class=flexinfo> <h1 class=obj_name> Recipes Cup </h1> <p class=obj_var> Variation: White </p> <p class=obj_qty> Qty: " + numberofcups + "</p> <p class=obj_price> $39 or 560 <img class='logo' src=/recicred.png> </div> </div> </div>").insertAfter(".reviewCart"); 
}

if (numberofplates > 0){
    $("<div class=shoppingcart> <div class=everything>" + picPlate + "<div class=flexinfo> <h1 class=obj_name> Recipes Plate </h1> <p class=obj_var> Variation: Orange </p> <p class=obj_qty> Qty: " + numberofplates + "</p> <p class=obj_price> $27 or 470 <img class='logo' src=/recicred.png> </div>").insertAfter(".reviewCart"); 
}

if (numberofcookers > 0){
    $("<div class=shoppingcart> <h1 class=obj_name> Recipes RiceCooker </h1> <p class=obj_var> Variation: Floral </p> <p class=obj_qty> Qty: " + numberofcookers + "</p> <p class=obj_price> $123 or 1940 <img class='logo' src=/recicred.png> </div>").insertAfter(".reviewCart"); 
}

if (numberofblenders > 0){
    $("<div class=shoppingcart> <h1 class=obj_name> Recipes Blender </h1> <p class=obj_var> Variation: Black </p> <p class=obj_qty> Qty: " + numberofblenders + "</p> <p class=obj_price> $89 or 1400 <img class='logo' src=/recicred.png> </div>").insertAfter(".reviewCart"); 
}

$('.payreci').click(function(){

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
    
                let currentPoints = response[i].Points 
    
                if (currentPoints > totalFee){
                    console.log("purchase was successful!")
                }
                    else{
                        console.log("Insufficient Reci-points!")
                    }
    
    
            }
        }
      });
})


