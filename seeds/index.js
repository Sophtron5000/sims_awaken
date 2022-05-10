const sequelize = require('../config/connection');
const userSeed = require('./user-seeds');
const postSeeds = require('./post-seeds');
const commentSeeds = require('./comment-seeds');

const seedDatabase = async() => {
    await sequelize.sync({ force: true });

    
    
}