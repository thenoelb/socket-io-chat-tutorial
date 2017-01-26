var app = require('express')();             //Express initializes 'app' (=Express App) to be function for http server
var http = require('http').Server(app);     //app is put into a server using http
var io = require('socket.io')(http);

app.get('/', function(req,res){                    //get(path, middleware), req = obj w/http request info, res = http response
    res.sendFile(__dirname + '/index.html');       //sendFile(__dirname + 'filename') = sends http response
});

io.on('connection', function(socket){       //occurs when a socket is opened
    console.log('a user connected');        //displays that a client has connected to the websocket chat
    socket.on('chat message', function(msg){    //adds a listener to websocket to listen for 'chat message'
        console.log('message: ' + msg);         //prints 'chat message'
        io.emit('chat message', msg);           //broadcasts message 'chat message'/msg to default room/namespace 
    });
});


http.listen(3000, function(){               //listen(port, [hostname], [backlog], callback) = binds and listens to connections on specified host and port, identical to Node's http.Server.listen()'
    console.log('listening on *:3000');     //displays action in console
});