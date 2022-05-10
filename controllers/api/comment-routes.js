const router = require('express').Router();
//import the Comment model for our routes
const { Comment } = require('../../models');
// make sure we connect to sequelize 
const sequelize = require('../../config/connection');
// requires users to be loggedIn in order to post or update comments
const withAuth = require('../../utils/auth');

//when viewing a post/:id, make sure to include all its related comments
router.get('/', (req, res) => {
        Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//click into a comment
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// when a user is loggedIn, user posts a comment, store texts, post and user ids 
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        // builds a new comment model instance and saves it
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
});

