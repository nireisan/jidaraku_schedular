var fs = require( 'fs' ),

    app = module.parent.exports,

    io = app.get( 'io' ),

    database = require('./database');

io.of( '/detail' ).on( 'connection', function ( socket ) {

    console.log( 'connect detail!!!' );

    socket.on( 'reqEventDetail', function( eventId ) {

        var eventId = '51698d7731510b11bf91ea09';
        database.getEventDetail(eventId, function(eventDetail) {
            console.log(eventDetail);
            socket.emit( 'resEventList', eventDetail);
        });

        // var eventDetail = JSON.parse( fs.readFileSync( './sampledata/eventDetail.json' ) );
        //
        // socket.emit( 'resEventDetail', eventDetail );
    } );
} );
