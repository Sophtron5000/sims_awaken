const withAuth = (req, res, next) => {
  if(!req.session.user_id) { //// If the user is not logged in, redirect the request to the login route
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;

