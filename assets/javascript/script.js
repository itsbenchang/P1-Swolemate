
$("#login-button").on("click", function(){
	$("#login").css("display", "block");
	$("#login").css("width", "auto");
});

$("#signup-button").on("click", function(){
	$("#signup").css("display", "block");
	$("#signup").css("width", "auto");
});

$("#submit-login").on("click", function(){
	
});

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

