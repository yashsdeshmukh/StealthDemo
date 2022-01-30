/*
The router package will act as an Api Gateway to forward/censor the incoming requests.
*/

const express = require('express');
const authRoute = require('./auth.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
