var socket;
var map;
var marker;
var player;
var chatinput;
var sendBtn;
var messages;

function initialize() {
    var myLatlng = new google.maps.LatLng(22.933935, 80.614524);
    var mapOptions = {
        zoom: 17,
        center: myLatlng
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Agent'
    });
}

function loadMaps() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=true&callback=initialize';
    document.body.appendChild(script);
}

window.onload = function() {
 
    loadMaps();

    socket = io.connect('http://realhack-server.herokuapp.com');
    player = document.getElementById("video_player_0");
    chatinput = $("#icon_prefix2");
    sendBtn = $("#sendButton");
    messages = [];

    socket.on('stream-client', function (data) {
        // latlngdata = data;
        console.log(data);
        var jsondat = JSON.parse(data);
        var center = new google.maps.LatLng(jsondat.latitude, jsondat.longitude);
        map.panTo(center);
        marker.setPosition(center);

        var url = jsondat.url;
        player.src = url;
    });

    socket.on('chat-msg', function (data) {
       console.log(data); 
    });

    $(sendBtn).click(function () {
        var text = $(chatinput).val();
        if (text.trim == '')
            return;
        // var username = $(usernameInput).val();
        socket.emit("send-chat", {'user': 'blah', 'text': text});
        $(chatinput).val("");
    });


}