const _ = require('lodash');

const isProduction = _.get(process, 'env.NODE_ENV', false) === 'production';

const knexConfig = isProduction ?
  {
    dialect: 'pg',
    connection: {
      user: 'postgres',
      password: 'password',
      database: 'lender-184617:us-central1:rosco-dev-1'
    }
  } :
  {
    dialect: 'pg',
    connection: {
      host: 'localhost',
      user: 'app',
      password: 'appusertest',
      database: 'lender_api_dev'
  }
};

module.exports = knexConfig
