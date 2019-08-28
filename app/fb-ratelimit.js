var http = require("https");

let access_token = process.env.FB_ACCESS_TOKEN
let url = 'https%3A%2F%2Fseeme.me%2Fch%2Fmonochampioncup%2F9l3P7Q%3Fpl%3Dyv4N6D'

var options = {
  "method": "GET",
  "hostname": "graph.facebook.com",
  "port": null,
  "path": "/v4.0/?id=" + url +"&access_token=" + access_token + "&fields=engagement",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "9c6b2f1c-6a33-127c-f537-75762479290f"
  }
};

for (var i = 0; i < 500; i++) {
    var req = http.request(options, function (res) {
        var chunks = [];
    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });
    req.end();
}