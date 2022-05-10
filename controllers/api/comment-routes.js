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

