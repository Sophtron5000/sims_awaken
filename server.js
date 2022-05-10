//dependencies 
// set up path which is uses for handling and transforming file paths.
const path = require('path');

//set up express so we can handle multiple http requests at specific urls
const express = require('express');

//session stores userData when accessing it and browses our app.
//saves and retrive data
const session = require('express-session');

//creates handlebars view engine for express
const exphbs = require('express-handlebars');

//imports routes we created via express
const routes = require('./controllers');

//imports our wuthAuth (authentication) and format_date helper
const helpers = require('./utils/helpers');

//imports connection to sequelize via Heroku or JawsDB
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

