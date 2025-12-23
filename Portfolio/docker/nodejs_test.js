var http = require('http');
var content = function(req, resp){
  resp.writeHead(200);
  resp.end("Good morning Korea~!\n");
}
var web = http.createServer(content);
web.listen(8002);
console.log('Server running at http://localhost:8002/');
