var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

var app =http.createServer(function(req, res) {
  if(/\/reg/.test(req.headers.referer)){

    var dataReg = {err:0,msg:'注册成功',token:'mxftoken',data:{title:'reg 服务器响应的数据'}};
    var dataRegError = {err:2,msg:'注册失败，用户名已注册',token:'',data:{title:'reg 服务器响应的注册失败数据'}};
    res.end(JSON.stringify(dataRegError));//普通的json  
  }
   if(req.method == 'POST'){
    var dataLogin = {err:0,msg:'登录成功',token:'mxftoken',data:{title:'login 服务器响应的数据'}};
    res.end(JSON.stringify(dataLogin));//普通的json  
   }
  if(req.headers.token=='mxftoken'){
    var pathname = __dirname + url.parse(req.url).pathname;
    if (path.extname(pathname) == "") {
      pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
      pathname += "index.html";
    }

    if (path.isAbsolute(pathname)) {
      switch (path.extname(pathname)) {
        case ".html":
          res.writeHead(200, {
            "Content-Type": "text/html"
          });
          break;
        case ".js":
          res.writeHead(200, {
            "Content-Type": "text/javascript"
          });
          break;
        case ".css":
          res.writeHead(200, {
            "Content-Type": "text/css"
          });
          break;
        case ".gif":
          res.writeHead(200, {
            "Content-Type": "image/gif"
          });
          break;
        case ".jpg":
          res.writeHead(200, {
            "Content-Type": "image/jpeg"
          });
          break;
        case ".png":
          res.writeHead(200, {
            "Content-Type": "image/png"
          });
          break;
        default:
          res.writeHead(200, {
            "Content-Type": "application/octet-stream"
          });
      }

      fs.readFile(pathname, function(err, data) {
        res.end(data);
      });
    } else {
      res.writeHead(404, {
        "Content-Type": "text/html"
      });
      res.end("<h1>404 Not Found</h1>");
    }
    // console.log(req.headers)
  }else{
    var dataError = {"title":"跨域请求的数据--错误版","err":2};
    res.end(JSON.stringify(dataError));//普通的json  

  }

})

app.listen(8080, "0.0.0.0")




console.log("Server running at http://127.0.0.1:8080/");