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

router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, appConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(400).json({success: false, message: 'Failed to Authenticate'});
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
});

router.post('/accept', (req, res, next) => {
  knex('transactions')
    .where('id', '=', req.body.transactionId)
    .update({
      status: 'accepted',
      accepted_by_user_id: req.body.fromUser
    })
    .then(() => {
      res.json({
        success: true,
        message: 'Transaction updated'
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'Transaction failed to update'
      })
    })
});

router.post('/new', (req, res, next) => {
  const transaction = {
    amount: req.body.amount,
    interest: req.body.interest,
    promise_to_pay_date: req.body.promise_to_pay_date,
    memo: req.body.memo,
    created_by_user_id: req.decoded.id
  };

  knex
    .insert(transaction)
    .into('transactions')
    .then(() => {
      res.json({
        success: true,
        message: 'Transaction added'
      })
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Failed to add transaction',
        error: error
      })
    })
});

router.get('/lock/:transactionId', (req, res, next) => {
  const transactionId = req.params.transactionId;
  knex('transactions')
    .where('id', '=', transactionId)
    .update({
      status: 'locked',
      locked_on_timestamp: knex.fn.now()
    })
    .then((row) => {
      res.json({
        success: true,
        data: row[0]
      })
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Failed to lock transaction',
        error: error
      })
    })
});

router.get('/free/:transactionId', (req, res, next) => {
  const transactionId = req.params.transactionId;

  knex('transactions')
    .where('id', '=', transactionId)
    .update({
      status: 'pending',
      locked_on_timestamp: null
    })
    .then((row) => {
      res.json({
        success: true,
        data: row[0]
      })
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Failed to free transaction',
        error: error
      })
    })
});
router.get('/repay/:transactionId', (req, res, next) => {
  const transactionId = req.params.transactionId;

  knex('transactions')
    .where('id', '=', transactionId)
    .update({
      status: 'settled',
      settled_on: knex.fn.now()
    })
    .then((row) => {
      res.json({
        success: true,
        data: row[0]
      })
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Failed to repay transaction',
        error: error
      })
    })
});

router.get('/fetchAllLoanedByUser/:userId', (req, res, next) => {
  knex
    .select()
    .table('transactions')
    .where('accepted_by_user_id', '=', req.params.userId)
    .then((row) => {
      res.json({
        success: true,
        data: row
      })
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error
      })
    })
});

router.get('/fetchAllBorrowedForUser/:userId', (req, res, next) => {
  knex
    .select()
    .table('transactions')
    .where('created_by_user_id', '=', req.params.userId)
    .then((row) => {
      res.json({
        success: true,
        data: row
      })
    })
    .catch((error) => {
      res.json({
        success: false,
        error: error
      })
    })
})

router.get('/:transactionId', (req, res, next) => {
  knex.select().from('transactions').where({id: req.params.transactionId}).then((row) => {
    res.json(row[0])
  });
});

router.get('/', (req, res, next) => {
  knex
    .where('status', '!=', 'settled')
    .select()
    .from('transactions')
    .then((row) => {
      res.json(row)
    });
});

module.exports = router;
