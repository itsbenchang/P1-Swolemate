// Initialize Firebase
var config = {
    apiKey: "AIzaSyDxQ4YEmF_TY6huoWtT67y2Xj7Gw-0hyoM",
    authDomain: "swolemate-e6470.firebaseapp.com",
    databaseURL: "https://swolemate-e6470.firebaseio.com",
    storageBucket: "swolemate-e6470.appspot.com",
    messagingSenderId: "771999306115"
};
firebase.initializeApp(config);

var chatroom;
var curUser;

// helper functions --------------------------------------------------------------------------
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

function fixSize() {
    var windowHeight = ($(window).height() - 131);

    $('#chatcontent').css('height', windowHeight);
    $('.messages').css('height', windowHeight);
    $('.lobbychannels').css('height', windowHeight);
    $('.chatchannels').css('height', (windowHeight - 52));
};

function channelSelect () {
    // Add color to hovering over channel
    $(".container .row .lobbychannels .chatchannels .channel").on("mouseenter", function() {
        $(this).addClass('channel-hover').siblings().removeClass('channel-hover');
    });

    $(".container .row .lobbychannels .chatchannels .channel").on("click", function() {
        $(this).addClass('highlight').siblings().removeClass('highlight');
        // Assign variable to what channel was clicked on
        chatroom = $(this).attr('id');
        // Select channel and display messages from channel
        firebase.database().ref().child("/chat").child(chatroom).on('value', function (snapshot) {
            updateUI(snapshot.val())
        });
    });

}

//On Click Send message
$(".chatButton").on("click", "#send",function () {
    // Get the inputted message using jquery
    var message = $('#message-input').val();
    // Clear the input box
    $('#message-input').val('');

    // Get current time
    var time = new Date().toLocaleTimeString();

    //push the new message object into Firebase using the reference variable
    firebase.database().ref().child("/chat").child(chatroom).push({
        username: curUser,
        message: message,
        time: time
    });
    // return false in to stop page from reloading
    return false;
});

// Ask user for username for chatting
$('#chat-name-submit').on("click", function(e){
      e.preventDefault();
      curUser = $("#chatusername").val();
      $('.chatModal').hide();
});

// Hide window if user decides to cancel
$('#chatcancel').on("click", function(){
      $('.chatModal').hide();

    // Disable send button if user hits cancel
    $("#send").hide();
});

// Adjust chatroom to adjust to window height
fixSize();
$(window).resize(function() {
    fixSize();
});

channelSelect ();

$('.username').html(curUser);

