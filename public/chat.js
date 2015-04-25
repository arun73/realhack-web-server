var socket;
var field;
var sendButton;
var content;
var messages;

window.onload = function() {
 
    messages = [];
    socket = io.connect('http://realhack-server.herokuapp.com');
    field = $(".field");
    sendButton = $(".send");
    content = $("#content");
 
    socket.on('message', function (data) {
        console.log(data);
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            $(content).html(html);
            //content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    $(sendButton).click(function() {
        var text = $(field).val();
        socket.emit('send', {'message': text});
    });
}