var http = require('http');
var fs = require("fs");
var mime = require("mime");

var server = http.createServer(serverStart);

function serverStart(request,response){
    console.log(request.method);
    console.log(request.url);
    var url = request.url;
    var template = '/template';

    if(url == '/' || url == '/index.html'){
        url = template + '/index.html';
    }else{
        url = template + url;
    }

    response.setHeader('Content-Type',mime.lookup(url)+';chartset=utf-8');

    fs.readFile('.'+url,'utf8',function(err,data){
        if(err){
            response.statusCode = 404;
            response.end();
            console.log(err);
        }else{
            response.statusCode = 200;
            response.write(data);
            response.end();
        }
    })



};

server.listen(8080,"localhost");
