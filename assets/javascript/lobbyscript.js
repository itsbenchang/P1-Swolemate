// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyDxQ4YEmF_TY6huoWtT67y2Xj7Gw-0hyoM",
//     authDomain: "swolemate-e6470.firebaseapp.com",
//     databaseURL: "https://swolemate-e6470.firebaseio.com",
//     storageBucket: "swolemate-e6470.appspot.com",
//     messagingSenderId: "771999306115"
// };
// firebase.initializeApp(config);

// updateMessages(snapshot) -- updates all messages based on a snapshot object which holds all messages
//                             Run this when ever the data object is updated.
//                             For Firebase, add it as a callback to an on value change once

var chatroom = firebase.database().ref().child("/chat");
var lobby = firebase.database().ref().child("/chat").child("/lobby");

lobby.on('value', function (snapshot) {
    updateUI(snapshot.val())
});

//On Click Send function.
$("#send").click(function () {
    // Get the inputted message using jquery
    var message = $('#message-input').val();
    // Clear the input box
    $('#message-input').val('');

    // Get current time
    var time = new Date().toLocaleTimeString();

    //push the new message object into Firebase using the reference variable
    lobby.push({
        username: curUser,
        message: message,
        time: time
    });

    // return false in to stop page from reloading
    return false;
});


// var curUser = prompt("Please enter a username", "jigglybrain") || 'unknown';
    var curUser = "Bot";

$('.username').html(curUser);
// helper functions


//use newMessage to add a new message to the UI
// isCurUser should be set to true or false
function newMessage(message, username, time) {
    var position;
    if (curUser == username) {
        position = 'right'
    }
    else {
        position = 'left'
    }

    // $('.messages > ul').append($("<span class='li-username'>" + username + "blah"));
    $('.messages > ul').append($("<li class='li-" + position + "'><span class='li-message'>" + message + "</span><span class='li-username'>- " + username + " | " + time + "</span></li>"));

}

function scrollToBottom() {
    $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 1000);
}


function updateUI(messages) {
    $('.messages > ul').html('');


    for (var key in messages) {
        var message = messages[key];
        var isCurUser = curUser == message.username;

        newMessage(messages[key].message, messages[key].username, messages[key].time);
    }


    scrollToBottom();
}

fixSize();
$(window).resize(function() {
    fixSize();
});

function fixSize() {
    // Home position
    var windowHeight = ($(window).height() - 146);
    // var windowWidth = $(window).width();
    var chatChannelHeight = 
    $('#chatcontent').css('height', windowHeight);
    $('.messages').css('height', windowHeight);
    $('.lobbychannels').css('height', windowHeight);
    $('.chatchannels').css('height', (windowHeight - 62));
    //$('#home h1').each(function() {
        // $(this).css('padding-top', ($(this).parent().height() - $(this).height()) / 2);
    // });
};