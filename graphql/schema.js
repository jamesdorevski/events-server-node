const { GraphQLSchema } = require('graphql')
const createUserMutation = require('./mutations/createUser')
const getUserQuery = require('./queries/getUser')

const schema = new GraphQLSchema({
  query: getUserQuery,
  mutation: createUserMutation
})

module.exports = schema
