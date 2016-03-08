var http = require('http');
var fs = require("fs");
var mime = require("mime");
var urlnode = require("url");

var server = http.createServer(serverStart);

var persondata = {
    "person": [
        {
            "name": "闫宇韬",
            "age": "26",
            "des": "H5前端开发"
        },
        {
            "name": "闫宇韬",
            "age": "26",
            "des": "H5前端开发"
        },
        {
            "name": "闫宇韬",
            "age": "26",
            "des": "H5前端开发"
        }
    ]
};

function serverStart(request,response){
    console.log(request.method);
    console.log(request.url);

    readHtml(request,response);


    //添加json数据

    var urlObj = urlnode.parse(request.url,true);
    if(urlObj.query.method == 'addperson'){


            persondata.person.push(urlObj.query);

            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write('{"msg":"添加成功"}');
            console.log(persondata)
            response.end();

    }
    console.log(urlObj)


};

function readHtml(request,response){
    //配置模板路径
    var url = request.url;
    var template = '/template';
    if(url == '/' || url == '/index.html'){
        url = template + '/index.html';
    }else{
        url = template + url;
    }

    //设置返回头
    response.setHeader('Content-Type',mime.lookup(url)+';chartset=utf-8');

    //读取打开所有的页面html css js
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
}



server.listen(8080,"localhost");
