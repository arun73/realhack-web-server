var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
// app.set('views', __dirname + '/views');
// app.set('view engine', "html");
//app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	// response.render("index.");
    response.render('index.html');
});

var io = require('socket.io').listen(app.listen(app.get('port')));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    
    socket.on('streamdata', function (data) {
    	//console.log("Location data: " + data);
        var jsondat = JSON.parse(data);
    	io.sockets.emit('stream-client', data);
    	// io.sockets.emit('message', {message: data});
    });

    // socket.on('streamurl', function (data) {
    // 	console.log("Stream URL: " + data);
    //     io.sockets.emit('streamurl-client', {message: data})
    // });

    socket.on('send', function (data) {
    	console.log(data);
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + app.get('port'));
// app.listen(app.get('port'), function() {
//   console.log("Node app is running at localhost:" + app.get('port'));
// });
