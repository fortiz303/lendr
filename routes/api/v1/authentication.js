// ~/api/v1
const knexConfig = require('../../../config/db.js');
const appConfig = require('../../../config/app.js');

const passwordHelper = require('../../../utils/passwordHelper.js')

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var knex = require('knex')(knexConfig);
var jwt  = require('jsonwebtoken');
var bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
  knex
    .select()
    .from('users')
    .where({
      user_name: req.body.user_name
    })
    .then((row) => {
      if (_.isEmpty(row)) {
        res.json({
          success: false,
          message: 'Invalid Credentials'
        });
      } else {
        const ciphertext = row[0].password;
        const plaintext = req.body.password;

        passwordHelper.comparePasswords(ciphertext, plaintext)
          .then((passwordResponse) => {
            if (!passwordResponse) {
              res.json({
                success: false,
                message: 'Invalid Credentials'
              });
            } else {
              const payload = {user_name: row[0].user_name};
              const token = jwt.sign(payload, appConfig.secret);

              res.json({
                success: true,
                message: 'Token Issued.',
                token: token,
                user_name: row[0].user_name
              });
            }
          })
          .catch((error) => {
            res.json({
              success: false,
              message: 'Something went wrong',
              error: error
            })
          })
      }
    })
    .catch((error) => {
      res.json(error)
    })
});

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

    // VALIDATE EMAIL ADDRESS HERE AND BREAK IF WRONG
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
              message: `User ${user} created.`,
              user_name: user,
              password: pass
            })
            // Handle sign up email stuff here.
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

module.exports = router;
