const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// here I am creating one to many associations between User and Posts
// foreign key to target plural association mixins to the source.

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade" 
})

module.exports = { User, Post, Comment };


///// Post user.belongsTo allows us to set the model key through relation

