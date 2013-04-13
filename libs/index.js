var model = require('../model');
// parentだと、lib/index.js、そのparentがapp.js
// 汚い
var app = module.parent.parent.exports,

    io = app.get( 'io' );

var User = model.User;

exports.getUserId = function (account, accountId) {
    var User = model.User;
    console.log('account');
    console.log(account);
    User.findOne(accountId, function(err, user){
        if (err) {
            console.log('error');
            console.log(err);
        } else {
            console.log('errorなし');
            // ユーザ情報がないときは新規作成
            if ( user === null ) {
                var newUser = new User(account);
                newUser.save(function(err, user){
                    if (err) {
                        console.log(save_error);
                        console.log(err);
                    } else {
                        // user._idからそのユーザーが属するイベントの取得
                        console.log(user._id);
                        return user._id;
                    }
                });
            } else {
                console.log(user._id);
                return user._id;
                // user._idからそのユーザーが属するイベントの取得
            }
        }
    });
};

exports.getEventList = function (userId, condition) {
    var condition = condition || null;
    Event.find(userId, function(err, user){
        if (err) {
            console.log('error');
            console.log(err);
        } else {
            console.log('errorなし');
            // ユーザ情報がないときは新規作成
            if ( user === null ) {
                var newUser = new User(account);
                newUser.save(function(err, user){
                    if (err) {
                        console.log(save_error);
                        console.log(err);
                    } else {
                        // user._idからそのユーザーが属するイベントの取得
                        console.log(user._id);
                        return user._id;
                    }
                });
            } else {
                // user._idからそのユーザーが属するイベントの取得
            }
        }
    });
};

exports.getEventDetail = function (eventId) {
    var Event = model.Event;
    console.log('getEventDetail');
    Event.find({ _id : eventId }, function(err, eventDetail){
        if (err) {
            console.log('getEventDetail error')
            console.log(err);
            return false;
        } else {
            console.log(eventDetail);
            io.of( '/top' ).on( 'connection', function ( socket ) {
               socket.emit( 'resEventList', eventDetail);
               socket.emit( 'resEventDetail', eventDetail);
            });
        }
    });
};

exports.updateEventDetail = function (eventId, eventDetail) {
    var Event = model.Event;
    console.log('updateEventDetail');
    Event.find({ _id : eventId }, function(err, eventDetail){
        if (err) {
            console.log('getEventDetail error')
            console.log(err);
            return false;
        } else {
            console.log('hoge');
            console.log(eventDetail);
            return eventDetail;
        }
    });
};
