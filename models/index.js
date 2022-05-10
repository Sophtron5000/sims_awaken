const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// here I am creating one to many associations between User and Posts
// foreign key to target plural association mixins to the source.

User.hasMany(Post, {
    foreignKey: 'user_id'
});

