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
    ItemId : { type: Number },
    ItemName: { type: String, validate: [validator, "Empty Error"] },
    PosX : { type: Number },
    CreateUser: { type: String, validate: [validator, "Empty Error"] },
    Comment: { type: String, validate: [validator, "Empty Error"] },
    VoteUsers: { type: mongoose.Schema.Types.Mixed }
});

exports.User  = db.model('user',  UserShema);
exports.Event = db.model('event', EventShema);
