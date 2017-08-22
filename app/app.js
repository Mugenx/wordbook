var express = require('express');
var reload = require('reload');
// var pg = require('pg');
var app = express();



app.set('view engine', 'ejs');
app.set('views', 'app/views');


app.set('port', process.env.PORT || 4000);
app.locals.siteTitle = 'Mugenz';

app.use(express.static('app/public'));
app.use(require('./routes/index'));
 
var server = app.listen(app.get('port'), function () {
    console.log('GO to http://localhost:' + app.get('port'));
});

reload(server, app);
