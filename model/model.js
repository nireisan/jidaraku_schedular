var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/db');

function validator(v) {
  return v.length > 0;
}

var UserShema = new mongoose.Schema({
    facebookId : { type: String, validate: [validator, "Empty Error"] },
    // twitterId ...
    name       : { type: String, validate: [validator, "Empty Error"] },
});

// var Post = new mongoose.Schema({
//     UserId   : { type: String, validate: [validator, "Empty Error"] }
//     Item   : { type: String, validate: [validator, "Empty Error"] }
//   , created: { type: Date, default: Date.now }
// });
exports.User = db.model('user', UserShema);
