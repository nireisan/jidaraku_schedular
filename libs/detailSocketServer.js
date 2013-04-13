var fs = require( 'fs' ),

    app = module.parent.exports,
    
    io = app.get( 'io' );

io.of( '/detail' ).on( 'connection', function ( socket ) {

    console.log( 'connect detail!!!' );

    socket.on( 'reqEventDetail', function( eventId ) {

        // eventIdをブラウザから送られてきたとき

        // monngoに格納されているイベント情報を取得する
        // 一旦ファイルからサンプルjsonを取得しておく

        var eventDetail = JSON.parse( fs.readFileSync( './sampledata/eventDetail.json' ) );

        socket.emit( 'resEventDetail', eventDetail );
    } );
} );
