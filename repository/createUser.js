const psql = require('./pgAdapter').psql;

async function createUser(username, password) {
  await psql.none('INSERT INTO users(username, password) VALUES($1, $2)', [username, password]);
}

module.exports = {
    createUser
}