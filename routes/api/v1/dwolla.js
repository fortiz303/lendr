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

var dwolla = require('dwolla-v2');

// Init dwolla with correct env settings
var dwollaClient = new dwolla.Client({
  key: appConfig.dwollaKey,
  secret: appConfig.dwollaSecret,
  environment: appConfig.dwollaEnvironment,
});

const TOKEN = dwollaClient.auth.client()
  .then((appToken) => {
    return appToken.get('webhook-subscriptions');
  })
  .catch((error) => {
    console.log('Error getting app token', error);
    return false;
  })

var accountToken = new dwollaClient.Token({access_token: TOKEN});

// FAILED     REQ TYPE    DESCRIPTION
//firstName   yes string  Customer or if business, authorized representative’s first name.
//lastName    yes string  Customer or if business, authorized representative’s last name.
//email       yes string  Customer’s email address.
//type        yes string  Either personal or business. If business, see below for additional required information.
//address1    yes string  First line of the street address of the Customer’s permanent residence. Must be 50 characters or less. Note: PO Boxes are not allowed.
//city        yes string  City of Customer’s permanent residence.
//state       yes string  Two letter abbreviation of the state in which the Customer resides, e.g. CA.
//postalCode  yes string  Postal code of Customer’s permanent residence. Should be a five digit postal code, e.g. 50314.
//dateOfBirth yes string  Customer or if business, authorized representative’s date of birth in YYYY-MM-DD format. Must be 18 years or older.
//ssn         yes string  Last four digits of the Customer’s Social Security Number.
//ipAddress   no  string  Customer’s IP address.
//address2    no  string  Second line of the street address of the Customer’s permanent residence. Must be 50 characters or less. Note: PO Boxes are not allowed.
//phone       no  string  Customer or if business, authorized representative’s 10 digit phone number. No hyphens or other separators, e.g.

// Flow:
// 1) User signs up for Rosco
// 2) In the profile, surface a: 'Add Payment Source' button
// 3) Once clicked, user is presented with a form with the info below

function createClient(firstName, lastName, email, type = "personal", address1, city, state, postalCode, dateOfBirth, ssn) {
  if (!firstName || !lastName || !email || !type || !address1 || !city || !state || !postalCode || !dateOfBirth || !ssn) {
    return false;
  } else {

    return dwollaClient.auth.client()
      .then(client => {
        return client.post('customers', {
          firstName: firstName,
          lastName: lastName,
          email: email,
          type: type,
          address1: address1,
          city: city,
          state: state,
          postalCode: postalCode,
          dateOfBirth: dateOfBirth,
          ssn: ssn,
        })
        // .then(res => {console.log(res); return res.body})
      })
      .catch((error) => {
        return error
      })
  }
}

// createClient('null', 'Peter', 'Margaritoff', 'pmargaritoff@gmail.com')

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

// Post a new review
router.post('/create', (req, res, next) => {
  createClient(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.type,
    req.body.address1,
    req.body.city,
    req.body.state,
    req.body.postalCode,
    req.body.dateOfBirth,
    req.body.ssn
  )
  .then((data) => {
    const dwollaUrl = data.headers.get('location');
    if (!dwollaUrl) {
      return res.status(500).json({success: false, error: 'Unable to get Dwolla User ID but user should be created.'})
    } else {
      knex('users')
        .where('id', '=', req.body.user_id)
        .update({
          connected_to_dwolla: true,
          dwolla_id: dwollaUrl
        })
        .then((row) => {
          res.status(200).json({success: true, data: dwollaUrl});
        })
    }
  })
  .catch((error) => {
    res.status(500).json({success: false, error: error});
  });

});

module.exports = router;
