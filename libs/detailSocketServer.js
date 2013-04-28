var fs = require( 'fs' ),

    app = module.parent.exports,
    
    io = app.get( 'io' ),

    events = new Array(),

    init = function() {

        var sampleJson = fs.readFileSync( './sampledata/eventDetail.json' );

        events.push( JSON.parse( sampleJson ) );
    },

    getNewItems = function( addItemInfo ) {

        var length = events.length;

        for ( var i = 0; i < length; i++ ) {

            if ( events[i].Event.EventId == addItemInfo.EventId ) {

                addItem( i, addItemInfo );

                var items = {
                        IsSuccess: true,
                        Data     : events[i].Items
                    };

                return items;
            }
        }

        return { IsSuccess: false };
    },

    addItem = function( idx, itemInfo ) {

        var newItemObj = {
                ItemId   : events[idx].Items.length + 1,
                ItemName : itemInfo.ItemName,
                StartTime: itemInfo.StartTime,
                EndTime  : itemInfo.EndTime,
                Comment  : itemInfo.Comment,
                VoteCount: 1,
                VoteUsers: [
                    itemInfo.UserId
                ]
            };

        events[idx].Items.push( newItemObj );
    },

    getEventDetail = function( eventId ) {

        var length = events.length;

        for ( var i = 0; i < length; i++ ) {

            if ( events[i].Event.EventId == eventId ) {

                var detail = events[i];

                detail[ 'IsSuccess' ] = true;

                return detail;
            }
        }

        // イベントIDが存在しなかったのでエラー

        return { IsSuccess: false };
    };

init();

io.of( '/detail' ).on( 'connection', function ( socket ) {

    console.log( 'connect detail!!!' );

    socket.on( 'reqEventDetail', function( eventId ) {

        // eventIdをブラウザから送られてきたとき

        // monngoに格納されているイベント情報を取得する

        // プロトではメモリ上から取得
        socket.emit( 'resEventDetail', getEventDetail( eventId ) );
    } );

    socket.on( 'reqCreateItem', function( itemInfo ) {

        var newItems = getNewItems( itemInfo );

        console.log( newItems );

        socket.emit( 'resNewItems', newItems );
        socket.broadcast.emit( 'resNewItems', newItems );
    } );
} );
