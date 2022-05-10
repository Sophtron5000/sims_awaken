const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = process.env.JAWSDB_URL ? new Sequelize(process.env.JAWSDB_URL) : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql', // the underlying connector library used by Sequelize for MySQL is mysql2 npm package
    dialectOptions: { // we can provide custom options to it using the dialectOptions in the Seuqlize constructor:
        decimalNumbers: true,
    },
});

module.exports = sequelize;

