//<script src="https://www.gstatic.com/firebasejs/3.7.2/firebase.js"></script>
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDxQ4YEmF_TY6huoWtT67y2Xj7Gw-0hyoM",
    authDomain: "swolemate-e6470.firebaseapp.com",
    databaseURL: "https://swolemate-e6470.firebaseio.com",
    storageBucket: "swolemate-e6470.appspot.com",
    messagingSenderId: "771999306115"
};
firebase.initializeApp(config);

var database = firebase.database();




var map;
var userZipcode = 0;
var userCenter = {
    lat: 34.0689,
    lng: -118.4452
}


function initMap() {
    /*var uluru = {
        lat: -25.363,
        lng: 131.044
    };*/
    console.log(userCenter);
    //initializes map with zoom on current center
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: userCenter,
    });
    //Makes a marker in your current center
    var marker = new google.maps.Marker({
        position: userCenter,
        map: map
    });
    //call geocoder
    var geocoder = new google.maps.Geocoder();
    //on click translate inputted zipcode to lat lng
    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
        generateRadius();

    });
    //clear all markers and circles
    $("#clear").on("click", function() {

    });

    function generateRadius() {

        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
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

        console.log("new center "+lat, lng);

        console.log(userCenter);
    });
}
