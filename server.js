var express = require('express');
var app = express();
var compress = require('compression');
var fs = require('fs');
var exec = require('child_process').exec

var port = parseInt(process.env.PORT) || 80;
var http = require('http');

var checkfn = 'dbinitcheck.txt';

app.use(compress());

if(!fs.existsSync(checkfn)) {
    exec('node dbinit_remote.js', function(err) {
        if(!err) {
            fs.writeFileSync(checkfn, 'true');
            return;
        }

        console.log(err);
    });
}

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

app.use(express.static(__dirname + '/'));
app.listen(port);

console.log('Listening on port ' + port);