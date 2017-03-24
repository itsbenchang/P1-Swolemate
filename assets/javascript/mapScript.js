//<script src="https://www.gstatic.com/firebasejs/3.7.2/firebase.js"></script>
// Initialize Firebase
/*var config = {
    apiKey: "AIzaSyDxQ4YEmF_TY6huoWtT67y2Xj7Gw-0hyoM",
    authDomain: "swolemate-e6470.firebaseapp.com",
    databaseURL: "https://swolemate-e6470.firebaseio.com",
    storageBucket: "swolemate-e6470.appspot.com",
    messagingSenderId: "771999306115"
};
firebase.initializeApp(config);

var database = firebase.database();*/


var map;
var infowindow;
var userZipcode = 0;
var userCenter = {
    lat: 34.0689,
    lng: -118.4452
}
var userInterest = ["yoga", "martial arts"]
var userInput=[];
var inputSelected = false;

$(".checkbox").on("click", function() {

    
        userInput.push($(this).attr("value"));
        console.log(userInput);
        inputSelected = true;
        console.log(inputSelected);
   


});


function initMap() {
    /*var uluru = {
        lat: -25.363,
        lng: 131.044
    };*/

    console.log(userCenter);
    console.log(userInterest);

    //initializes map with zoom on current center
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: userCenter,
    });
    //Makes a marker in your current center
    /*var marker = new google.maps.Marker({
        clickable: true,
        cursor: "hi",
        animation: google.maps.Animation.DROP,
        position: userCenter,
        map: map
    });*/
    infowindow = new google.maps.InfoWindow();

    function populateMap() {
        var service = new google.maps.places.PlacesService(map);
        generateRadius();
        console.log(userCenter)
        
        for (var i = 0; i <= userInput.length; i++) {
            console.log(userInput[i]);
            service.textSearch({
                location: userCenter,
                radius: 8050,
                query: userInput[i]

            }, callback);   
        }

    }

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);

            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP

        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
            
        });
    }


    //call geocoder
    var geocoder = new google.maps.Geocoder();
    //on click translate inputted zipcode to lat lng
    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);


    });
    //generates circle
    $("#radius").on("click", function() {
        populateMap();
    });

    function generateRadius() {

        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.15,
            map: map,
            center: userCenter,
            radius: 8050
        });


        console.log(cityCircle);
        console.log("working");
    }



}

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    var lat = 0;
    var lng = 0;
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            //set's var latlng to object lat/lng
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            //create new marker at zipcode location
            var marker = new google.maps.Marker({
                draggable: true,
                map: resultsMap,
                position: results[0].geometry.location
            });



        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
        //Sets UserCenter to current desired zipcode's lat lng
        userCenter = {
            lat: lat,
            lng: lng
        }

        console.log("new center " + lat, lng);

        console.log(userCenter);
    });
}
