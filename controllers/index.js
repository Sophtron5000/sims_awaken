// imports express' router object
const router = require('express').Router();
// directs to our api/index.js
const apiRoutes = require('./api');
// imports home-route.js
const homeRoutes = require('./home-routes.js');
// imports our dashboard-routes.js
const dashboardRoutes = require('./dashboard-routes.js');

// use route variable based on what comes from front end javascript or user
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});
module.exports = router;