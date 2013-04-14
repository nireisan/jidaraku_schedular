var app = module.parent.exports,
    io = app.get( 'io' ),
    database = require('./database');

io.of( '/sample' ).on( 'connection', function ( socket ) {

    console.log( 'connect sample!!!' );

    socket.on( 'reqEventList', function( userId ) {
        database.getEventList(userId, null, function(eventList) {
            socket.emit( 'resEventList', eventList);
        });
    });

    /**
     * data = {
     *      eventName: ***,
     *      startDate : *** ,
     *      user : {
     *          id : ***,
     *          Name : ***
     *      }
     * }
     */
    socket.on( 'reqCreateEvent', function( data ) {
        database.createEvent(data, function(eventInfo) {
            socket.emit( 'resCreateEvent', eventInfo);
        });
    });

    socket.on( 'reqDeleteEvent', function( userId ) {
        database.getEventList(userId, null, function(eventList) {
            socket.emit( 'resDeleteEvent', eventList);
        });
    });
});
