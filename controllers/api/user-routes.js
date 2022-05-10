const router = require('express').Router();
// imports user, post, and Comment models 
const { User, Post, Comment } = require('../../models');

// for api/users, find ALL of the user's data
// if found, return the response, else return error message

router.get('/', (req, res) => {
    User.findall({
        attributes: { exclude: '[password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//when user click on this id, user info will be retrieved
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ]
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        },
        {
            model: Post,
            attributes: ['title']
        }
    ]
})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id. '});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
