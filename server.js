var http = require("http");

var crypto = require("crypto");
var postData = crypto.randomBytes(1000000).toString("base64");

var testPostDataHTML = `<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Test page</title>
    <script>
        var postData = ${JSON.stringify(postData)};
        var send = function (url, data) {
            var xhr = (window.ActiveXObject) ? new window.ActiveXObject("Microsoft.XMLHTTP") : new window.XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(data);
        };
        function doRequest() {
            send("/post", postData);
        }
        setInterval(doRequest, 50);
    </script>
</head>
<body></body>`;

console.log("NodeJS version: ", process.version);
setInterval(function() {
    console.log("Pausing work...");
    var initialTime = process.hrtime();
    while (true) {
        // this loop simulates some heavy work on the event loop
        var diff = process.hrtime(initialTime);
        if (diff[0] >= 8) {
            console.log("Resuming work...");
            return;
        }
    }
}, 10000);

var server = http.createServer();
server.on("request", function (req, res) {
    switch (req.url) {
        case "/":
            res.end(testPostDataHTML);
            break;
        case "/post":
            var chunks = [];
            req.setEncoding('utf-8');
            req.on('data', function (chunk) {
                chunks.push(chunk);
            });
            req.on('end', function () {
                var data = chunks.join('');
                var ok = postData === data;
                res.end(ok ? "OK" : "KO");
                console.log(ok ? "OK" : "KO");
                if (!ok) {
                    process.exit(1);
                    return;
                }
            });
            break;
        default:
            res.end("");
            break;
    }
});

server.listen(7777);
