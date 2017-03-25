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
var userZipcode = "";
var userCenter = {
    lat: 34.0689,
    lng: -118.4452
}
var userInterest = ["yoga", "martial arts"]
var userInput = [];
var inputSelected = false;
var markers = [];
var centerMarkers = [];




function initMap() {


    console.log(userCenter);
    console.log(userInterest);

    //initializes map with zoom on current center
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: userCenter,
    });
    //add something on click
    map.addListener('click', function(event) {
        //addMarker(event.latLng);
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

    $(".checkbox").on("click", function() {
        clearMarkers(); //clear all previous markers
        $(".checkbox").attr('switch', "off");
        var userQuery = $(this).attr('value');
        var switchOnOff = $(this).attr('switch');

        if (switchOnOff === "off") {
            $(this).attr('switch', "on");
            console.log(userQuery);
            populateMap(userQuery);

        } else if (switchOnOff === "on") {
            clearMarkers();
            $(this).attr('switch', "off");
            console.log(switchOnOff);

        }
    });

    function populateMap(query) {
        var service = new google.maps.places.PlacesService(map);
        generateRadius();
        console.log(userCenter)

        service.textSearch({
            location: userCenter,
            radius: 8050,
            query: query

        }, callback);


    }
    //returns relevant places given queries and for loop to create marker for each one
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
                //compare marker location with user location 
                //if within radius create marker else i++
            }
        }
    }
    // creates a marker given an place object's lat/lng given in location/////////////////////////
    function createMarker(place) {
        var placeLoc = place.geometry.location;

        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP
        });
        console.log(place);

        //set content on click
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(
                '<h2>' + place.name + '</h2>' + " " + place.formatted_address);
            infowindow.open(map, this);

        });
        markers.push(marker);

    }

    ///////////////////////////////////////////////////////////////////////
    //call geocoder////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    var geocoder = new google.maps.Geocoder();


    //Set Location//////////////////////////////////////////////////
    document.getElementById('set').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
        $('.checkbox').attr('checked', false);

    });
    ///////////////////////////////////////////////////////////////////////
    //Clears markers///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    $("#clear").on("click", function() {
        console.log("clear markers");
        clearMarkers();
        deleteMarkers();
        console.log(markers);

    });
    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);


    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];

    }
    /////////////////////////////////////////////////////////////////////////////////////
    ///////Create circle object ///////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        markers.push(cityCircle);


        console.log(cityCircle);
        console.log("working");

    }
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

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
            centerMarkers.push(marker);




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
