const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userSeed = require('./user-seeds');
const postSeeds = require('./post-seeds');
const commentSeeds = require('./comment-seeds');

const seedDatabase = async() => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeed, {
    individualHooks: true,
    return: true,
  });

  await Post.bulkCreate(postSeeds);
  await Comment.bulkCreate(commentSeeds);

  process.exit(0);
};

seedDatabase();