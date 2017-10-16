var http = require('http');
var fs = require('fs');
var settings = require('./settings');

var server = http.createServer();
server.on('request', function(req, res){
    fs.readFile(__dirname + '/public/hello.html', 'utf-8', function(err, data) {
        if(err) {
            res.writeHead(404, {'ContentType': 'text/plain'});
            res.write('not found.')
            return res.end();
        }
        res.writeHead(200, {'ContentType' : 'text/html'});
        res.write(data);
        res.end();
    });
});

server.listen(settings.port, settings.host);
console.log('server listen...');
