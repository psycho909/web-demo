var http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs"); //file system module
var server = http.createServer(function (req, res) {
	res.writeHead(200, { "content-type": "text/html" });
	fs.createReadStream("index.html").pipe(res);
});

const mineTypes = {
	html: "text/html",
	jpeg: "image/jpeg",
	jpg: "image/jpg",
	png: "image/png",
	js: "text/javascript",
	css: "text/css"
};

server.listen(5000);
console.log("Node js web server");
