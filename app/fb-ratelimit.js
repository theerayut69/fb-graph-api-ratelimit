require('dotenv').config()
var http = require("https");

let access_token = process.env.FB_ACCESS_TOKEN
let url = process.env.URL
let postman_token = process.env.POSTMAN_TOKEN

var options = {
  "method": "GET",
  "hostname": "graph.facebook.com",
  "port": null,
  "path": "/v4.0/?id=" + url +"&access_token=" + access_token + "&fields=engagement",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": postman_token
  }
}

for (var i = 0; i < 10; i++) {
    var req = http.request(options, function (res) {
        var chunks = []
    
        res.on("data", function (chunk) {
            chunks.push(chunk)
        });
    
        res.on("end", function () {
            var body = Buffer.concat(chunks)
            console.log(body.toString())
        });
    });
    req.end()
}