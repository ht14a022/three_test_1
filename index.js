const express = require('express');
const morgan = require('morgan');
const config = require('config');

const app = express();
const http = require('http').Server(app);
const socket = require('socket.io').listen(http);

// Log
if (app.get('env') === 'production') {
    var fs = require('fs');
    var stream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
    app.use(morgan('common', { stream: stream }));
} else {
    app.use(morgan('dev'));
}

// 静的ファイル配信
app.use(express.static(__dirname + '/public'));

// WebSocket
socket.on('connection', function (event) {
    console.log('a user connected');
    event.on('bar pos', function (msg) {
        // console.log(msg);
        event.broadcast.emit('bar pos', msg);
    });
});

http.listen(config.Server.port, () => {
    console.log('listening on *:' + config.Server.port);
});