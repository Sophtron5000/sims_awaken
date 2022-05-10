// import our connections
const sequelize = require('../config/connection');
// import our Post, User, Comment models
const { Post, User, Comment } = require('../models');
// import express router
const router = require('express').Router();

// get route to homepage, and find all posts
router.get('/', (req, res) => {
    // read the entire table from db with findAll()
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
})
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        console.log('===================');
        console.log('===================');
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
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
router.get('/signup', (req, res) {
    res.render('signup');
});

// user can view the single post when click on the post on the homepage
// user can also add comments
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
})
.then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    const post = dbPostData.get({ plain: true });
    console.log(post);
    res.render('single-post', { post, loggedIn: req.session.loggedIn });


})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;




