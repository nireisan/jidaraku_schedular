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

    socket.on( 'reqCreateItem', function( itemInfo ) {

        console.log( itemInfo );

/*
        var newItem = [{
                ItemId: itemInfo,
                ItemName: "new item だにぃ",
                    PosX: 0,
                    PosY: 33,
                    SizeX: 3,
                    SizeY: 5,
                    Comment: "あたらしく作ったよー！",
                    VoteCount: 0,
                    VoteUsers: [
                        'hkitamur'
                    ]
                }
            ];

        socket.emit( 'resNewItem', newItem );
        socket.broadcast.emit( 'resNewItem', newItem );
*/
    } );
} );
