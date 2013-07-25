
/*
 * GET users listing.
 */

exports.country = function(req, res, next){
    req.app.get('cassandra').cql('SELECT * FROM countrys LIMIT 10', function(err, countrys){
        if(err){
            return next(err);
        }

        res.render('country', { title: 'Country', countrys: countrys });
    });
};

exports.new = function(req, res, next){
    var insert = 'UPDATE countrys SET state=? WHERE country=?',
        params = [req.body.state, req.body.country];

    req.app.get('cassandra').cql(insert,  params, function(err, countrys){
        if(err){
            return next(err);
        }

        res.redirect('/country');
    });
};

exports.delete = function(req, res, next){
    var remove = 'DELETE FROM countrys WHERE country=?',
        params = [req.body.country];

    req.app.get('cassandra').cql(remove,  params, function(err, countrys){
        if(err){
            return next(err);
        }

        res.redirect('/country');
    });
};
