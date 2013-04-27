
exports.index = function(req, res){
    console.log('index');
    console.log(req.user);
    res.render('index', { title: 'じだらくスケジューラ' });
};
