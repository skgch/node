var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var settings = require('./settings');

var server = http.createServer();

var template = fs.readFileSync(__dirname + '/public/hello.ejs', 'utf-8');
var n = 0;
server.on('request', function(req, res){
    n++;
    data = ejs.render(template, {
        title: 'hello',
        content: '<strong>World</strong>',
        n: n
    });
    res.writeHead(200, {'ContentType' : 'text/html'});
    res.write(data);
    res.end();
});

server.listen(settings.port, settings.host);
console.log('server listen...');
