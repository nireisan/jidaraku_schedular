/*
 * GET home page.
 */

exports.detail = function( req, res ) {

    // --------- 定数・変数定義 ---------
    
    var eventDetail = {
            "Event" : {
                "EventName" : "第三回開発作戦会議！！！",
                "CreateUser": "nireisan",
                "StartDate" : "2013/04/07"
            },
            "Items" : [
                {
                    "ItemId"    : 1,
                    "ItemName"  : "アイテムのタイトルなんだぜ☆",
                    "PosX"      : 0,
                    "PosY"      : 3,
                    "SizeX"     : 3,
                    "SizeY"     : 2,
                    "CreateUser": "hkitamur",
                    "Comment"   : "ここは作成者しか更新できないコメント欄だぜ☆",
                    "VoteCount" : 2,
                    "VoteUsers" : [
                        "hkitamur",
                        "shomma"
                    ]
                },
                {
                    "ItemId"    : 2,
                    "ItemName"  : "アイテムのタイトルなんだぜ☆",
                    "PosX"      : 0,
                    "PosY"      : 7,
                    "SizeX"     : 3,
                    "SizeY"     : 6,
                    "CreateUser": "hkitamur",
                    "Comment"   : "ここは作成者しか更新できないコメント欄だぜ☆",
                    "VoteCount" : 2,
                    "VoteUsers" : [
                        "hkitamur",
                        "shomma"
                    ]
                }
            ],
            "Participates" : [
                {
                    "UserId"   : "1234",
                    "UserName" : "えの"
                },
                {
                    "UserId"   : "1234",
                    "UserName" : "えの"
                }
            ]
        },
    
    // -------- 関数定義 ---------
    
        setEventInfo = function( eventId ) {
        
            // eventIdを指定してmongoDBからイベント情報取得
            
            // 本来はコールバック関数で指定するが、
            // プロトでは上記サンプルデータを指定して直接関数を実行する
            callBackGetEventInfo( eventDetail );
        },
        
        /** イベントデータをテンプレートにセットする */
        callBackGetEventInfo = function( eventInfo ) {
        
            res.render( 'detail', {
                title: eventInfo.Event.EventName
            });
        };
        
    // --------- 処理 ---------
    
    ( function() {
    
        if ( req.query.id === undefined ) {
            
            // IDが指定されていないのでエラー表示
        }
        
        setEventInfo( req.query.id );
        
    } )();
};
