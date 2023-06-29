const hash = require('../library/hash')
const createUserDB = require('../repository/createUser')

class User {
  constructor (id, { username, password, createdAt, updatedAt }) {
    this.id = id
    this.username = username
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

const root = {
  createUser: ({ input }) => {
    const pwdHashed = hash.hashPassword(input.password)
    const id = createUserDB.createUser(input.username, pwdHashed)

    return new User(id, input.username)
  }
}

module.exports = root
