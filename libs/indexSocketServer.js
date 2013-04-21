var app = module.parent.exports,
    io = app.get( 'io' ),
    database = require('./database');

io.of( '/top' ).on( 'connection', function ( socket ) {

    console.log( 'connect top!!!' );

    socket.on( 'reqEventList', function( account ) {
        database.getUserInfo(account, function(user) {
            // 文字列にキャスト
            var userId = '' + user._id;
            database.getEventList(userId, null, function(eventList) {
                socket.emit( 'resEventList', eventList);
            });
        });
    });
});
