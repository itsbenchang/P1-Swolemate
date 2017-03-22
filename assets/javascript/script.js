
$("#login-button").on("click", function(){
	$("#login").css("display", "block");
	$("#login").css("width", "auto");
});

$("#signup-button").on("click", function(){
	$("#signup").css("display", "block");
	$("#signup").css("width", "auto");
});

$("#submit-login").on("click", function(){
	console.log("click");
	$(location).attr("href","profile.html");
	return false;
});

$('button').mouseup(function() { this.blur() })

$(function () {
    var splash = $('.splash');
    var backgrounds = [
      'url(assets/images/buddylift.jpg)', 
      'url(assets/images/buddyrun.jpg)',
      'url(assets/images/buddysit.jpg)',
      'url(assets/images/groupfitness.jpg)'];
    var current = 0;

    function nextBackground() {
        splash.css(
            'background-image',
        backgrounds[current = ++current % backgrounds.length]);

        setTimeout(nextBackground, 5000);
    }
    setTimeout(nextBackground, 5000);
    splash.css('background-image', backgrounds[0]);
});

   // Firebase 

 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyDxQ4YEmF_TY6huoWtT67y2Xj7Gw-0hyoM",
   authDomain: "swolemate-e6470.firebaseapp.com",
   databaseURL: "https://swolemate-e6470.firebaseio.com",
   storageBucket: "swolemate-e6470.appspot.com",
   messagingSenderId: "771999306115"
 };




$(document).ready(function() {

    
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    // $(".upload-button").on('click', function() {
    //    $(".file-upload").click();
    // });
});

