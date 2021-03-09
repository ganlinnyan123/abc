const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  
  const db = req.con;
  let data = "";
  let {user} = req,query;
  //let user = req.query.user;

  let filter;
  if (user) {
      filter = 'WHERE userid = ?';
  }

  db.query(`SELECT * FROM account ${filter}${user}`, (err, rows)=> {
      if (err) {
          console.log(err);
      }
      let data = rows;

      // use index.ejs
      res.render('index', { title: 'Account Information', data, user });
  });

});

router.get('/add', (req,res,next)=>{
  res.render('userAdd', {title:'Add User'});
});

router.post('/userAdd', (req, res, next)=> {

  let db = req.con;
  const userid = req.body.userid;
  const password = req.body.password;
  const email = req.body.email;
  let sql = {
      userid,
      password,
      email,
  };

  //console.log(sql);
  let qur = db.query('INSERT INTO account SET ?', sql, (err, rows)=> {
      if (err) {
          console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});


router.get('/userEdit', (req,res,next)=>{
  let {id} = req.query;
  //let id = req.query.id;
  let db = req.con;
  let data = "";

  db.query('SELECT * FROM account WHERE id = ?',id,(err,rows)=>{
    if (err){
      console.log(err);
    }
    let data = rows;
    res.render('userEdit', { title : 'Edit Account', data:data});
  });
});

router.post('/userEdit', (req, res, next)=> {

  let db = req.con;
  let {id} = req.body;
  //let id = req.body.id;
  const userid = req.body.userid;
  const password = req.body.password;
  const email = req.body.email;
  let sql = {
      userid,
      password,
      email,
  };

  let qur = db.query('UPDATE account SET ? WHERE id = ?', [sql, id], (err, rows)=> {
      if (err) {
          console.log(err);
      }

      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});

router.get('/userDelete', (req,res,next)=>{
  let {id} = req.query;
  //let id = req.query.id;
  let db = req.con;

  let qur = db.query('DELETE FROM account WHERE id = ?', id,(err,rwos)=>{
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
