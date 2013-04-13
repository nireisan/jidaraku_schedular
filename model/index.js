var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/db');

function validator(v) {
  return v.length > 0;
}

var UserShema = new mongoose.Schema({
    FacebookId : { type: String, validate: [validator, "Empty Error"] },
    // twitterId ...
    Name       : { type: String, validate: [validator, "Empty Error"] },
});

var EventShema = new mongoose.Schema({
    Event        : { type : mongoose.Schema.Types.Mixed },
    Items        : { type : mongoose.Schema.Types.Mixed },
    Participates : { type : mongoose.Schema.Types.Mixed }
});

exports.User  = db.model('user',  UserShema);
exports.Event = db.model('event', EventShema);
