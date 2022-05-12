// import our connections
// eslint-disable-next-line no-unused-vars
const sequelize = require('../config/connection');
// import our Post, User, Comment models
// eslint-disable-next-line no-unused-vars
const { Post, User, Comment } = require('../models');
// import express router
const router = require('express').Router();

// get route to homepage, and find all posts
router.get('/', (req, res) => {
  res.render('homepage');
});

// if user clicks on login, the page will be redirected to handlebars page 
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// if user clicks on signup, user will get the same response as login
router.get('/signup', (req, res) => {
  res.render('signup');
});



module.exports = router;




