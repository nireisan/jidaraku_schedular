
/*
 * GET home page.
 */

//var model = require('../model/model');
//var User = model.User;
exports.index = function(req, res){
    res.render('index', { title: 'じだらくスケジューラ' });
};
