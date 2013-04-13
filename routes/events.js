/*
 * GET home page.
 */

exports.events = function( req, res ) {
    //u はuserId
    if (req.query.u === undefined) {
        // IDが指定されていないのでエラー表示
    }

    res.render('events', {
        userId : req.query.u
    });
};
