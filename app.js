
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  
  , detail = require('./routes/detail').detail;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/detail', detail);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// socketServer
var io = require( 'socket.io' ).listen( server ),

    fs = require( 'fs' );

io.sockets.on( 'connection', function( socket ) {

    socket.on( 'eventId', function( eventId ) {
    
        // eventIdをブラウザから送られてきたとき
        
        // monngoに格納されているイベント情報を取得する        
        // とりあえずファイルからサンプルjsonを取得しておく
        
        var eventDetail = JSON.parse( fs.readFileSync( './sampledata/eventDetail.json' ) );
        
        socket.emit( 'eventDetail', eventDetail );
    } );
} );