
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'じだらくスケジューラ' });
};

exports.form = function(req, res){
  res.render('form', { title: 'New Entry' })
};

exports.create = function(req, res){
  var newPost = new Post(req.body);
  newPost.save(function(err){
     if (err) {
       console.log(err);
       res.redirect('back');
     } else {
       res.redirect('/');
     }
    });
};

