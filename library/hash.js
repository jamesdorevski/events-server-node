const argon2 = require("argon2");

function hashPassword(password) {
  try {
    return argon2.hash(password);
  } catch (err) {
    console.log(err);
  }
}

function verifyPassword(hash, password) {
  try {
    return argon2.verify(hash, password);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
};
