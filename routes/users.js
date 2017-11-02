const knexConfig = require('../config/db.js');

var express = require('express');
var router = express.Router();
var knex = require('knex')(knexConfig);

const passwordHelper = require('../utils/passwordHelper.js');

// Signup
router.post('/signup', (req, res, next) => {
  const user = req.body.user_name;
  const pass = req.body.password;

  if (!user || !pass) {
    res.json({
      success: false,
      message: 'Missing username or password',
    });
  } else {
    passwordHelper
      .returnHashedPassword(pass)
      .then((hash) => {
        knex
          .insert({
            user_name: user,
            password: hash
          })
          .into('users')
          .then(() => {
            res.json({
              success: true,
              message: `User ${user} created.`
            })
          })
          .catch((error) => {
            res.json({
              success: false,
              message: `Failed creating user ${user}.`,
              error: error
            })
          })
      })
      .catch((error) => {
        res.json({
          success: false,
          message: 'Signup failed',
          error: error
        })
      });
  }
});

// Reset route
// TBD
router.get('/reset/:token', (req, res, next) => {

});

// Displays public user info
router.get('/:userId', (req, res, next) => {

});

module.exports = router;
