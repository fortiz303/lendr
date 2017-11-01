const knexConfig = require('../config/db.js');

var express = require('express');
var router = express.Router();
var knex = require('knex')(knexConfig);

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
router.get('/', (req, res, next) => {
  knex.select().from('users').then((row) => {
    res.json(row)
  })
});
/* GET users listing. */
router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  knex.select().from('users').where({id: userId}).then((row) => {
    res.json(row)
  })
});

module.exports = router;
