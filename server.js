//dependencies.
//set up path which is uses for handling and transforming file paths.
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


const app = express();

//set the environment variable PORT to tell your web server what port to listen on.
const PORT = process.env.PORT || 3001;

//set up Handlebars.js engine w/ custom helpers
const hdb = exphbs.create({ helpers });

const sess = {
  // required to sign the session ID cookie
  secret: 'Choose the red pill or blue pill',

  //session ID cookie
  cookie: { maxAge: null},

  //false is typically suggested;
  resave: false,

  saveUninitialized: true,

  store: new SequelizeStore({
    //connect sequelize with express and session to db
  })
};
//creates middleware for session
app.use(session(sess));

// tells express.js which template engine to utilize
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}!`));
});


