var express = require('express');
var router = express.Router();
var mysql = require("mysql")
var bcrypt = require("bcrypt")
var conn = require("../database/conn");
var path = require('path');

const { validator } = require("../validator");

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log("======> routes/index.js req.session.flag= " + req.session.flag);
  if(req.session.flag == 1) {
    req.session.destroy();
    res.render('index', { title: 'GC Web', message : 'Username Already Exists.', flag : 1 });
  }
  else if(req.session.flag == 2) {
    req.session.destroy();
    res.render('index', { title: 'GC Web', message : 'Registration Successfully Completed. Please login!', flag : 0 });
  }
  else if(req.session.flag == 3) {
    req.session.destroy();
    res.render('index', { title: 'GC Web', message : 'Confirm Password Does not Match.', flag : 1 });
  }
  else if(req.session.flag == 4) {
    req.session.destroy();
    res.render('index', { title: 'GC Web', message : 'Incorrect Username OR Password.', flag : 1 });
  }
  else if(req.session.flag == 5) {
    req.session.destroy();
    res.render('index', { title: 'GC Web', message : 'Please Login your Account.', flag : 1 });
  }
  else if(req.session.flag == 6) {
    req.session.destroy();
    res.render('index', { title: 'GC Web', message : "Form Validation Error : Check registration fields", flag : 1 });
  }
  else {
    //res.send('Index main page');
    res.render('index');
    //res.render('index2', { title: 'GC Web'});
    //res.sendFile('index.ejs',{root:path.join(__dirname,'../views')});
  }
});

/* GET login page. */
 router.get('/login', (req, res, next) => {
  //console.log("======> routes/index.js request /login");
  //res.send('Login page');
  res.sendFile('login.html',{root:path.join(__dirname,'../views')});
}); 

/* Authentication for registration */
router.post("/auth_reg", validator, (req, res, next) => {
  console.log("======> router.post/auth_reg ");
  var username = req.body.username;
  var password = req.body.password;
  var cpassword = req.body.cpassword;

  if(password == cpassword) {
    var sql = 'select * from users where username = ?;';

    conn.query(sql,[username], (err, result, fields) => {
      if (err) throw err;

      if(result.length > 0) {
        req.session.flag = 1;
        res.redirect('/');
      }
      else {
        // var hashPassword = bcrypt.hashSync(password, 10);
        var sql = 'insert into users(username,password) values (?,?);';
        conn.query(sql, [username,password], (err, result, fields) => {
          if(err) throw err;
          req.session.flag = 2;
          res.redirect('/');
        })
      }
    })
  }
  else {
    req.session.flag = 3;
    res.redirect('/');
  }
})

/* Authentication for login */
router.post('/auth_login', (req, res, next) => {
  //console.log("======> index router / auth_login ");
  //res.send('auth_login page');
  
  var username = req.body.username;
  var password = req.body.password;

  var sql = 'select * from users where username = ?;';

  conn.query(sql,[username], (err, result, fields) => {
    if (err) throw err;

    // var hashedPassword = bcrypt.compareSync(password, result[0].password)
    if(result.length && password == result[0].password) {
      req.session.username = username;
      res.redirect('/home');
    }else {
      req.session.flag = 4;
      res.redirect("/login")
    }
  })
  
})

/* Home page router */
router.get("/home", (req, res, next) => {
  console.log("======> router.post/home ");
  if(req.session.username) {
    res.render('home', {message : "Welcome, " + req.session.username});  
  }
  else {
    req.session.flag = 5;
    res.redirect("/")
  }
})

/* Logout router */
router.get("/logout", (req, res) => {
  console.log("======> router.post/logout ");
  if(req.session.username) {
    req.session.destroy();
  }
  res.redirect("/");
})
module.exports = router;
