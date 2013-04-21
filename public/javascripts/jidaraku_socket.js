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
            /** タイムスケジュールのリストを生成する(プロト用) */
            mkTimeList = function( itemInfoList ) {

                var length = itemInfoList.length;

                for ( var i = 0; i < length; i++ ) {

                    setItem( itemInfoList[i] );
                }

                jQuery( '#timeschedule' ).listview( 'refresh' );
            },

            setItem = function( itemInfo ) {

                var hour = mkHourByPos( itemInfo.PosY, itemInfo.SizeY );

                var divider = jQuery( '<li>' ).html( hour );
                divider.attr( 'data-role', 'list-divider' );
                jQuery( '#timeschedule' ).append( divider );

                jQuery( '#timeschedule' ).append( mkItem( itemInfo ) );
            },

            mkHourByPos = function( posY, sizeY ) {

                var startHour = Math.floor( posY / 2 ),
                    startMin  = 30 * ( posY % 2 ),
                    endHour   = startHour + Math.floor( sizeY / 2 ),
                    endmin    = 30 * Math.floor( sizeY % 2 );

                if ( startMin == 0 ) {

                    startMin = '00';
                }

                if ( endmin == 0 ) {

                    endmin = '00';
                }

                return startHour + ':' + startMin + ' 〜 ' + endHour + ':' + endmin;
            },

            mkItem = function( itemInfo ) {

                var li = jQuery( '<li>' ),

                    a = jQuery( '<a>' ),

                    head = jQuery( '<h3>' ).html( itemInfo.ItemName );

                    createUser = jQuery( '<p>' ).html( '作成者：' + itemInfo.CreateUser );

                    comment = jQuery( '<p>' ).html( itemInfo.Comment );

                setItemDialog( itemInfo );

                a.attr( 'href', '#itemDialog_' + itemInfo.ItemId );
                a.attr( 'data-rel', 'dialog' );
                a.attr( 'data-transitio', 'pop' );
                a.append( head );
                a.append( createUser );
                a.append( comment );

                li.append( a );

                return li;
            },
            
            setItemDialog = function( itemInfo ) {

                var dialog = jQuery( '<div>' );
                dialog.attr( 'id', 'itemDialog_' + itemInfo.ItemId );
                dialog.attr( 'data-role', 'page' );

                var head = jQuery( '<div>' ).html( jQuery( '<h1>' ).html( '賛同者一覧' ) );
                head.attr( 'data-role', 'header' );
                dialog.append( head );

                var content = jQuery( '<div>' );
                content.attr( 'data-role', 'content' );

                var length = itemInfo.VoteUsers.length;

                for ( var i = 0; i < length; i++ ) {

                    content.append( jQuery( '<p>' ).html( itemInfo.VoteUsers[i] ) );
                }

                dialog.append( content );

                jQuery( 'body' ).append( dialog );
            };

        var eventId = jQuery( '#eventId' ).val(),

            socket = io.connect( 'http://www12139ui.sakura.ne.jp:50280/detail' );
                
        socket.on( 'connect', function() {

            console.log( 'connect!!!' );
        
            // 接続したらeventIdを投げる
        
            socket.emit( 'reqEventDetail', eventId );
        } );
        
        socket.on( 'resEventDetail', function( eventDetail ) {
        
            // eventの詳細受け取る
            
            console.log( eventDetail );
            
            mkParticipateList( eventDetail.Participates );
            
            //mkSchedule( eventDetail.Items );
            mkTimeList( eventDetail.Items );
        } );
    } );

} )( jQuery, window );
