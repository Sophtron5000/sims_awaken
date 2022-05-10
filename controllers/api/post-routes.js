//import the express router object
const router = require('express').Router();

//include User, Post, Comment for these routes
const { Post, User, Comment } = require('../../models');
// create a connection with sequelize to database 
const sequelize = require('../../config/connection');

//import our authenticator to make sure users are logged in so they can post 
const withAuth = require('../../utils/auth');

// when a post is added, find all content and post it in reversing order
// the newest posts will be on the top
router.get('/', (req, res) => {
    console.log('---------------------');
    Post.findAll({
        attributes: ['id',
        'title',
        'content',
        'created_at'
    ],
    include: [{
        model: User,
        attributes: ['username']
    },
    {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    }
]

    })
    .then(dbPostData => res.json(dbPostData.reverse()))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

