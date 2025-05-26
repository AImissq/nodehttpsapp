var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');
var path = require('path');

var port = 80;

var httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
    ca: fs.readFileSync(path.join(__dirname, 'ssl', 'ca.crt'))
};

app.use(express.static('public'));
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.setHeader('X-XSS-Protection', '1;mode=block');
    res.setHeader('Al-Tuba', 'Satyam');
    next();
  });

app.get('/', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body><h1>Al tuba server up</h1></body></html>');
});

https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`server up: https://localhost:${port}`);
});
