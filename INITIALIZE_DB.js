const knexConfig = require('./config/db');

var knex = require('knex')(knexConfig)

console.log('Connected to db');
console.log('Creating new tables with');

knex.schema
  .createTable('users', (table) => {
    table.increments('id');
    table.string('user_name');
    table.integer('user_rating');
    table.varchar('password');
  })
  .createTable('transactions', (table) => {
    table.increments('id');
    table.string('from');
    table.string('to');
    table.integer('ammount');
    table.string('status');
    table.integer('user_id').unsigned().references('users.id')
  })
  .then(() => {
    return knex.insert({
      user_name: 'Test User 1',
      user_rating: 0
    }).into('users')
  })
  .then((rows) => {
    return knex.table('transactions').insert({
      user_id: rows[0],
      from: 'Test user 1',
      to: 'Test user 2',
      ammount: 100,
      status: 'pending'
    })
  })
  .then(() => {
    return knex('users')
      .join('transactions', 'users.id', 'transactions.id')
      .select();
  })
  .map((row) => {
    console.log(row)
  })
  .catch((error) => {
    console.log('Something went wrong. ', error);
  })

console.log('Created tables');
