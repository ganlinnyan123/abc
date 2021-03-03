var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var db = req.con;
  var data = "";

  var user = "";
  var user = req.query.user;

  var filter = "";
  if (user) {
      filter = 'WHERE userid = ?';
  }

  db.query('SELECT * FROM account ' + filter, user, function(err, rows) {
      if (err) {
          console.log(err);
      }
      var data = rows;

      // use index.ejs
      res.render('index', { title: 'Account Information', data: data, user: user });
  });

});

router.get('/add', function(req,res,next){
  res.render('userAdd', {title:'Add User'});
});

router.post('/userAdd', function(req, res, next) {

  var db = req.con;

  var sql = {
      userid: req.body.userid,
      password: req.body.password,
      email: req.body.email
  };

  //console.log(sql);
  var qur = db.query('INSERT INTO account SET ?', sql, function(err, rows) {
      if (err) {
          console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});


router.get('/userEdit', function(req,res,next){
  var id = req.query.id;
  var db = req.con;
  var data = "";

  db.query('SELECT * FROM account WHERE id = ?',id,function(err,rows){
    if (err){
      console.log(err);
    }
    var data = rows;
    res.render('userEdit', { title : 'Edit Account', data:data});
  });
});

router.post('/userEdit', function(req, res, next) {

  var db = req.con;
  var id = req.body.id;

  var sql = {
      userid: req.body.userid,
      password: req.body.password,
      email: req.body.email
  };

  var qur = db.query('UPDATE account SET ? WHERE id = ?', [sql, id], function(err, rows) {
      if (err) {
          console.log(err);
      }

      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});

router.get('/userDelete', function(req,res,next){
  var id = req.query.id;
  var db = req.con;

  var qur = db.query('DELETE FROM account WHERE id = ?', id,function(err,rwos){
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
