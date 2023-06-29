const { GraphQLInputObjectType, GraphQLString } = require('graphql')

const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  }
})

module.exports = CreateUserInputType
