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

