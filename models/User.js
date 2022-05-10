const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');

// user Model goes here

class User extends Model {
  checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
  }
}

User.init( // Sequelize DT object to provide what type of data is it
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    password: { // password column
      type: DataTypes.STRING,
      allowNull: false, // completes only if validation is a success
      validate: {
        len: [8] //validates legnth attribute rule in the model definition
      }
    }
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;

      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize, // pass in our sequelize connection instance (the direct connection)
    timestamps: false, 
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;


