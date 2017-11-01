// ~/api/v1

const knexConfig = require('../../../config/db.js');
const appConfig = require('../../../config/app.js');

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var knex = require('knex')(knexConfig);
var jwt  = require('jsonwebtoken');

router.get('/setup', (req, res, next) => {
  const setupUser = {
    user_name: 'Seed User',
    password: 'password'
  }

  knex
    .insert(setupUser)
    .into('users')
    .then(() => {
      res.json({success: true})
    })
    .catch((error) => {
      console.log('something went wrong saving setup user');
    })
});

router.post('/authenticate', (req, res) => {
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
        if (req.body.password !== row[0].password) {
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
            token: token
          });
        }
      }
    })
    .catch((error) => {
      res.json(error)
    })
})



router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, appConfig.secret, (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to Authenticate'});
      } else {
        req.decoded = decoded;
        console.log(req.decoded)
        next();
      }
    })
  } else {
    return res.json({
      success: false,
      message: 'No token provided'
    })
  }
})

router.get('/users', (req, res, next) => {
  console.log(req)
  knex.select().from('users').then((row) => {
    res.json(row)
  })
});
/* GET users listing. */
router.get('/users/:userId', (req, res, next) => {
  const userId = req.params.userId;
  knex.select().from('users').where({id: userId}).then((row) => {
    res.json(row)
  })
});

module.exports = router;
