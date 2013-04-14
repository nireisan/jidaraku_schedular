var model = require('../model'),
    User  = model.User,
    Event = model.Event;

exports.getUserInfo = function (account, callback) {
    if (typeof account.FacebookId !== 'undefined') {
        var accountId = { FacebookId : account.FacebookId };
    }
    else if (typeof account.TwitterId !== 'undefined') {
        var accountId = { TwitterId : account.TwitterId };
    } else {
        return false;
    }

    User.findOne(accountId, function(err, user){
        if (err) {
            console.log(err);
        } else {
            if ( user !== null ) {
                callback(user);
            } else {
                // ユーザ情報がないときは新規作成
                var newUser = new User(account);
                newUser.save(function(err, user){
                    if (err) {
                        console.log(err);
                    } else {
                        callback(user);
                    }
                });
            }
        }
    });
};

/**
 * @function getEvenList
 * @param userId ユーザーID
 * @param conditon 絞り込みやソート（未実装）
 * @param callback コールバック関数
 */
exports.getEventList = function (userId, condition, callback) {
    Event.find({ "Participates.UserId" : userId}, function(err, eventList){
            if (err) {
                console.log(err);
                return false;
            } else {
                callback(eventList);
            }
        }
    );
};

exports.getEventDetail = function (eventId, callback) {
    var Event = model.Event;
    console.log('getEventDetail');
    Event.find({ _id : eventId }, function(err, eventDetail){
        if (err) {
            console.log(err);
            return false;
        } else {
            callback(eventDetail);
        }
    });
};
