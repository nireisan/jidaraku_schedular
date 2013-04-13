( function( jQuery, window, undefined ) {

    jQuery( function() {
    
            /** 参加者リストの作成 */
        var mkParticipateList = function( userList ) {
                
                var length = userList.length;
                
                for ( var i = 0; i < length; i++ ) {
                
                    var li = jQuery( '<li>' ).html( userList[i].UserId );
                    
                    jQuery( '#userListview' ).append( li );
                }
            },
            
            /** アイテムリストの作成 */
            mkSchedule = function( itemInfoList ) {
            
                var length = itemInfoList.length;
                
                for ( var i = 0; i < length; i++ ) {
                
                    var item = mkItem( itemInfoList[i] );
                    
                    jQuery( '#schedule' ).append( item ).trigger( 'create' );
                }
            },
            
            /** item */
            mkItem = function( itemInfo ) {
            
                var cssItem = {
                        position  : 'absolute',
                        left      : getLeft( itemInfo.PosX ),
                        top       : getTop( itemInfo.PosY ),
                        width     : getWidth( itemInfo.SizeX ),
                        height    : getHeight( itemInfo.SizeY ),
                        background: 'rgba( 255, 0, 0, 0.5 )'
                    },
                    
                    item = jQuery( '<div>' ).css( cssItem );
                    
                return item;
            },
            
            getLeft = function( posX ) {
            
                if ( posX === 1 ) {
                
                    return '33.3%';
                    
                } else if ( posX === 2 ) {
                
                    return '50%';
                    
                } else if ( posX === 3 ) {
                
                    return '66.6%';
                    
                } else {
                
                    return '0';
                }
            },
            
            getTop = function( posY ) {
            
                var top = ( posY * 25 ) + 'px';
            
                return posY * 25;
            },
            
            getWidth = function( sizeX ) {
            
                if ( sizeX === 0 ) {
                
                    return '33.3%';
                    
                } else if ( sizeX === 1 ) {
                
                    return '50%';
                    
                } else if ( sizeX === 2 ) {
                
                    return '66.6%';
                    
                } else {
                
                    return '100%';
                }
            },
            
            getHeight = function( sizeY ) {
            
                var heigth = ( sizeY * 25 + 25 ) + 'px';
                
                return heigth;
            };
        
        var eventId = jQuery( '#eventId' ).val();
        
            socket = io.connect( 'http://localhost' );
                
        socket.on( 'connect', function() {
        
            // 接続したらeventIdを投げる
        
            socket.emit( 'eventId', eventId );
        } );
        
        socket.on( 'eventDetail', function( eventDetail ) {
        
            // eventの詳細受け取る
            
            console.log( eventDetail );
            
            mkParticipateList( eventDetail.Participates );
            
            mkSchedule( eventDetail.Items );
        } );
    } );

} )( jQuery, window );