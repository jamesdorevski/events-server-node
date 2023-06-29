const hash = require("../library/hash");
const createUserDB = require("../repository/createUser");

class User {
  constructor(id, { username, password, createdAt, updatedAt }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

var root = {
  createUser: ({ username, password }) => {
    const hash = hash.hashPassword(password);
    const id = createUserDB.createUser(username, hash);

    return new User(id, username);
  },
};

module.exports = root;
