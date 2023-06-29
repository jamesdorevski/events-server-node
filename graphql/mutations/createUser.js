const { GraphQLObjectType } = require('graphql')
const CreateUserInputType = require('../inputs/createUserInputType')
const UserType = require('../types/user')
const hash = require('../../library/hash')
const createUserDB = require('../../repository/createUser')
const jwt = require('koa-jwt')

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        input: { type: CreateUserInputType }
      },
      resolve
    }
  }
})

async function resolve (parent, { input }) {
  const { username, password } = input

  const pwdHashed = hash.hashPassword(password)
  const id = await createUserDB.createUser(username, pwdHashed)

  const token = jwt.sign({
    id
  }, 'secret', { expiresIn: '1h' })

  return { id, username, token }
}

module.exports = MutationType
