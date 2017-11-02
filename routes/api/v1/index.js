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

// function returnHashedPassword(password = 'password') {
//   const saltRounds = 10;

//   return new Promise((resolve, reject) => {
//     bcrypt.hash(password, saltRounds, (err, hash) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(hash)
//       }
//     })
//   })
// };

// function comparePasswords(ciphertext, plaintext) {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(plaintext, ciphertext, function(err, res) {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(res)
//       }
//     });
//   })
// }

router.post('/authenticate', (req, res) => {
  console.log(req.body)
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
                token: token
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
})

router.get('/addRandomUser', (req, res, next) => {
  const randomPassword = passwordHelper.returnHashedPassword().then((hash) => {
    const randomName = `RandomUser${Math.random()}`;
    const randomPass = hash;
    knex
      .insert({
        user_name: randomName,
        password: randomPass
      })
      .into('users')
      .then(() => {
        res.json({success: true, message: `Random user created with username ${randomName} pass: ${randomPass}`})
      })
      .catch((error) => {
        res.json({success: false, message: 'Something went wrong.', error: error})
      })
  })
});

router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, appConfig.secret, (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to Authenticate'});
      } else {
        req.decoded = decoded;
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
