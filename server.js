var express = require('express');
var app = express();
var compress = require('compression');
var fs = require('fs');

var port = parseInt(process.env.PORT) || 80;
var http = require('http');

app.use(compress());

app.get('/', function(req, res) {
    fs.readFile('./domain/index.html', function (err, data) {
        res.send( data.toString()
            .replace(/\{SITE_NAME\}/g, process.env.SITE_NAME || '')
            .replace(/\{MSA_URL\}/g  , process.env.MSA_URL   || '')
        );
    });
});

app.get('/health/', function(req, res) {
    res.json({health: "ok"});
});

console.log('__dirname = ' + __dirname);
app.use(express.static(__dirname + '/'));

app.listen(port);

console.log('Listening on port ' + port);