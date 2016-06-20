var express = require('express');
var app = express();
var path = require("path");

app.use( express.static( __dirname));

// app.get('/', function (req, res) {
//   res.sendFile(path.join( __dirname, 'index.html'));
// });

function spaHandler(req, res, next) {
    res.status(200).sendFile(path.join(__dirname, '/ts/samples/spa/index.html'));
}

app.get('/', spaHandler);
app.get('/spa', spaHandler);
app.get('/spa/*', spaHandler);

function defaultControlsRoute(req, res, next) {
  res.status(200).sendFile(path.join(__dirname, '/ts/samples/index.html'));
}
app.get('/components/', defaultControlsRoute);
app.get('/components', defaultControlsRoute);
app.get('/components/:component', function(req, res, next)
{
  var component = req.params.component;
  res.status(200).sendFile(path.join(__dirname, '/ts/samples/' + component + '/index.html'));
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});