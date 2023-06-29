const pgPromise = require('pg-promise')

const connStr = 'postgres://kinship-local:letmein@localhost:5432/kinship'

const pgq = pgPromise({})
const psql = pgq(connStr)

exports.psql = psql
