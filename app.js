var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var handlebars = require('express3-handlebars').create({
    defaultLayout:'mobile',
    partialsDir: 'views/partials',
    extname: '.hbs',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

// app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

//路由
var routes_web = require('./routes/routes-config-web');
app.use(routes_web);    //web端路由文件
var routes_mobile = require('./routes/routes-config-mobile');
app.use(routes_mobile);   //mobile端路由文件

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var debug = require('debug')('ujipin-app');

app.set('port', process.env.PORT || 8010);

var server = app.listen(app.get('port'), function() {
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
    debug('Express server listening on port ' + server.address().port);
});


module.exports = app;
