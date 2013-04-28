var fs = require( 'fs' ),

    app = module.parent.exports,
    
    io = app.get( 'io' ),

    items = new Array();

io.of( '/detail' ).on( 'connection', function ( socket ) {

    console.log( 'connect detail!!!' );

    socket.on( 'reqEventDetail', function( eventId ) {

        // eventIdをブラウザから送られてきたとき

        // monngoに格納されているイベント情報を取得する
        // 一旦ファイルからサンプルjsonを取得しておく

        var eventDetail = JSON.parse( fs.readFileSync( './sampledata/eventDetail.json' ) );

        socket.emit( 'resEventDetail', eventDetail );

        items = eventDetail.Items;
    } );

    socket.on( 'reqCreateItem', function( itemInfo ) {

        items.push( {
            ItemId: items.length + 1,
            ItemName: itemInfo.ItemName,
            StartTime: itemInfo.StartTime,
            EndTime: itemInfo.EndTime,
            Comment: itemInfo.Comment,
            VoteCount: 1,
            VoteUsers: [
                itemInfo.UserId
            ]
        } );

        socket.emit( 'resNewItem', items );
        socket.broadcast.emit( 'resNewItem', items );
    } );
} );
