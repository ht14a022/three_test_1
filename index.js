const express = require('express');
const morgan = require('morgan');
const config = require('config');

const app = express();
const http = require('http').Server(app);

// Log

if (app.get('env') === 'production') {
    var fs = require('fs');
    var stream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
    app.use(morgan('common', { stream: stream }));
} else {
    app.use(morgan('dev'));
}

app.use(express.static(__dirname + '/public'));

http.listen(config.Server.port, function () {
    console.log('listening on *:' + config.Server.port);
});