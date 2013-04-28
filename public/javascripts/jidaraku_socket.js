( function( jQuery, window, undefined ) {

    jQuery( function() {

        // ---------- 変数・定数定義 ---------
    
        var mEventId = jQuery( '#eventId' ).val(),

            // イベント日のタイムスタンプ格納場所
            mEventDate = 0, 

            socket = io.connect( 'http://www12139ui.sakura.ne.jp:50280/detail' ),
                
        // --------- 関数定義 ---------

            getEventId = function() {
                
                return mEventId;
            },

            getEventDate = function() {

                return mEventDate;
            },

            setEventDate = function( timestamp ) {

                mEventDate = timestamp;
            }

            /** 参加者リストの作成 */
            // {{{ mkParticipateList = function( userList )
            mkParticipateList = function( userList ) {
                
                var length = userList.length;
                
                for ( var i = 0; i < length; i++ ) {
                
                    var li = jQuery( '<li>' ).html( userList[i].UserId );
                    
                    jQuery( '#userListview' ).append( li );
                }
            },
            // }}}
            
            /** アイテムリストの作成 */
            /** タイムスケジュールのリストを生成する(プロト用) */
            // {{{ mkTimeList = function( itemInfoList )
            mkTimeList = function( itemInfoList ) {

                jQuery( '#timeschedule' ).html( '' );

                var length = itemInfoList.length;

                for ( var i = 0; i < length; i++ ) {

                    setItem( itemInfoList[i] );
                }

                jQuery( '#timeschedule' ).listview( 'refresh' );
            },
            // }}}

            // itemInfoからアイテム一覧を作る
            // {{{ setItem = function( itemInfo )
            setItem = function( itemInfo ) {

                var hour = mkHour( itemInfo.StartTime, itemInfo.EndTime );

                var divider = jQuery( '<li>' ).html( hour );
                divider.attr( 'data-role', 'list-divider' );
                jQuery( '#timeschedule' ).append( divider );

                jQuery( '#timeschedule' ).append( mkItem( itemInfo ) );
            },
            // }}}

            // アイテムの時間の生成
            // {{{ mkHour = function( startTimestamp, endTimestamp )
            mkHour = function( startTimestamp, endTimestamp ) {

                var startDate = new Date( startTimestamp ),
                    endDate = new Date( endTimestamp );

                var startHour = startDate.getHours(),
                    startMin  = startDate.getMinutes(),
                    endHour   = endDate.getHours(),
                    endMin    = endDate.getMinutes();

                if ( startHour < 10 ) { startHour = '0' + startHour; }
                if ( startMin < 10 )  { startMin = '0' + startMin; }
                if ( endHour < 10 )   { endHour = '0' + endHour; }
                if ( endMin < 10 )    { endMin = '0' + endMin; }

                return ( startHour + ':' + startMin + ' 〜 ' + endHour + ':' + endMin );
            },
            // }}}

            // アイテムのdomの生成
            // {{{ mkItem = function( itemInfo )
            mkItem = function( itemInfo ) {

                var li = jQuery( '<li>' ),

                    a = jQuery( '<a>' ),

                    head = jQuery( '<h3>' ).html( itemInfo.ItemName );

                    comment = jQuery( '<p>' ).html( itemInfo.Comment );

                setItemDialog( itemInfo );

                a.attr( 'href', '#itemDialog_' + itemInfo.ItemId );
                a.attr( 'data-rel', 'dialog' );
                a.attr( 'data-transition', 'pop' );
                a.append( head );
                a.append( comment );

                li.append( a );

                return li;
            },
            // }}}
            
            // アイテムをタップした際のダイアログを生成する
            // {{{ setItemDialog = function( itemInfo )
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
            },
            // }}}

            // アイテム追加時にサーバーに渡す情報の生成
            // {{{ mkItemInfo = function( title, comment, start, end )
            mkItemInfo = function( title, comment, start, end ) {

                var startTime = start.split( ':' ),
                    startHour = startTime[0] * 60 * 60 * 1000,
                    startMin  = startTime[1] * 60 * 1000,
                    startTimestamp = getEventDate() + startHour + startMin,

                    endTime = end.split( ':' ),
                    endHour = Number( endTime[0] * 60 * 60 * 1000 ),
                    endMin  = Number( endTime[1] * 60 * 1000 ),
                    endTimestamp = getEventDate() + endHour + endMin,

                    itemInfo = {
                        EventId: getEventId(),
                        UserId: 'hkitamur',
                        ItemName: title,
                        Comment: comment,
                        StartTime: startTimestamp,
                        EndTime: endTimestamp
                    };

                return itemInfo;
            },
            // }}}

            // 文字列のエスケープ
            // {{{ htmlEscape = function( string ) 
            htmlEscape = function( string ) {

                string = String( string ).replace( /&(?!\w+;)/g, '&amp;' );
                string = String( string ).replace( /</g, '&lt;' );
                string = String( string ).replace( />/g, '&gt;' );
                string = String( string ).replace( /"/g, '&quot;' );

                return string;
            };
            // }}}

        // --------- イベントリスナ(SOCKET) ---------

        socket.on( 'connect', function() {

            console.log( 'connect!!!' );
        
            // 接続したらeventIdを投げる
        
            socket.emit( 'reqEventDetail', getEventId() );
        } );
        
        socket.on( 'resEventDetail', function( eventDetail ) {
        
            // eventの詳細受け取る

            console.log( eventDetail );
            
            if ( eventDetail.IsSuccess === true ) {

                mkParticipateList( eventDetail.Participates );
            
                mkTimeList( eventDetail.Items );

                setEventDate( Number( eventDetail.Event.StartDate ) );
            }
        } );

        socket.on( 'resNewItems', function( items ) {

            console.log( items );

            if ( items.IsSuccess === true ) {

                mkTimeList( items.Data );

                jQuery( '#timeschedule' ).listview( 'refresh' );

            } else {

                alert( 'アイテムの作成に失敗しました' );
            }
        } );

        // --------- イベントリスナ ---------

        jQuery( '#addItemButton' ).bind( 'tap', function() {

            var title   = htmlEscape( jQuery( '#itemTitle' ).val() ),
                comment = htmlEscape( jQuery( '#itemComment' ).val() ),
                start   = htmlEscape( jQuery( '#itemStart' ).val() ),
                end     = htmlEscape( jQuery( '#itemEnd' ).val() );

            if ( title == '' || comment == '' || start == '' || end == '' ) {

                alert( '入力に不備があります' );

            } else {

                var itemInfo = mkItemInfo( title, comment, start, end );

                socket.emit( 'reqCreateItem', itemInfo );

                jQuery( '#addItem' ).dialog( 'close' );
            }
        } );
    } );

} )( jQuery, window );
