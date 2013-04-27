/*
 * GET home page.
 */

exports.detail = function( req, res ) {

    // --------- 関数定義 ---------

    var setEventInfo = function( eventId ) {
        
            // eventIdを指定してmongoDBからイベント情報取得

            var eventInfo = {
                    "EventName" : "第三回開発作戦会議！！！",
                    "CreateUser": "nireisan",
                    "StartDate" : "2013/04/07"
                };
            
            // 本来はコールバック内で実行する
            res.render( 'detail', {
                id      : eventId,
                title   : eventInfo.EventName,
                creater : eventInfo.CreateUser,
                date    : eventInfo.StartDate
            } );
        };

    // --------- 処理 ---------
    
    ( function() {
    
        if ( req.query.id === undefined ) {
            
            // IDが指定されていないのでエラー表示
        }
        
        setEventInfo( req.query.id );
        
    } )();
};
