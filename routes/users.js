const knexConfig = require('../config/db.js');

var express = require('express');
var router = express.Router();
var knex = require('knex')(knexConfig);

/* GET users listing. */
router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  knex.select().from('users').where({id: userId}).then((row) => {
    res.send(JSON.stringify(row))
  })
  console.log(userId)
});

module.exports = router;
