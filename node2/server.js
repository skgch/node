var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var qs = require('querystring');
var settings = require('./settings');

var server = http.createServer();

var template = fs.readFileSync(__dirname + '/public/bbs.ejs', 'utf-8');
var posts = [];

function renderForm(posts, res) {
    var data = ejs.render(template, {
        posts: posts
    });
    res.writeHead(200, {'ContentType' : 'text/html'});
    res.write(data);
    res.end();
}

server.on('request', function(req, res){
    if(req.url !== '/favicon.ico') {
        if(req.method==="POST"){
            req.data = "";
            req.on('readable', function(){
                req.data += req.read();
            });
            req.on('end', function() {
                var query = qs.parse(req.data);
                posts.push(query.name);
                renderForm(posts, res);
            });
        } else {
            renderForm(posts, res);
        }    
    }
});

server.listen(settings.port, settings.host);
console.log('server listen...');
