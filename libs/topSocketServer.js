var app = module.parent.exports;
// lib
var libs = require('./index');

    var io = app.get( 'io' );

io.of( '/top' ).on( 'connection', function ( socket ) {

    console.log( 'connect top!!!' );

    socket.on( 'reqEventList', function( account ) {

        if (typeof account.FacebookId !== 'undefined') {
            var accountId = { FacebookId : account.FacebookId };
        }

        // とりあえずイベント詳細を返す
        var eventId = '51691a9cf940a94ee632dbeb';
        libs.getEventDetail(eventId);
    } );
} );
