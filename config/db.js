const knexConfig = {
  dialect: 'pg',
  connection: {
    host: 'localhost',
    user: 'app',
    password: 'appusertest',
    database: 'lender_api_dev'
  }
};

module.exports = knexConfig
