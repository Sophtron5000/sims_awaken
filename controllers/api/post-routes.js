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

// when user clicks on a single post, return all data
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id},
    attributes: ['id',
      'content',
      'title',
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
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id'});
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// when user clicks on update, the post-id data will be replaced with new ones
router.put('/:id', withAuth, (req, res) => {
  Post.update({
    title: req.body.title,
    content: req.body.content
  }, {
    where: {
      id: req.params.id
    }
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found witht this id.'});
      return;
    }
    res.json(dbPostData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// when user clicks on delete, the data will be removed from db
router.delete('/:id', withAuth, (req, res) => {
  // delete multiple instances. on post/:id page, click the delete button will prompt FE form and sends a delete request back 
  Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id. '});
      return;
    }
    res.json(dbPostData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
