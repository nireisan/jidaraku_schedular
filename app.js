
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , model = require('./model/model');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/form', routes.form);
app.post('/create', routes.create);
app.get('/users', user.list);

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// socket.io
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('account', function (account) { // 認証データの取得
        console.log(account);
        if (typeof account.facebookId !== 'undefined') {
            var accountId = { facebookId : account.facebookId };
        }

        // user._idの取得
        var User = model.User;
        User.findOne(accountId, function(err, user){
            if (err) {
                console.log(err);
            } else {
                // ユーザ情報がないときは新規作成
                if ( user === null ) {
                    var newUser = new User(account);
                    newUser.save(function(err, user){
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(user._id);
                            // user._idからそのユーザーが属するイベントの取得
                        }
                    });
                } else {
                    console.log(user._id);
                    // user._idからそのユーザーが属するイベントの取得
                }
            }
        });
    });
    // ユーザーデータの送信
});
