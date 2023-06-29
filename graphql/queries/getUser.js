const { GraphQLObjectType, GraphQLID } = require('graphql')
const UserType = require('../types/user')

const UserTypeQuery = new GraphQLObjectType({
  name: 'UserTypeQuery',
  fields: {
    getUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, { id }) => {
        // Resolve the user object
        console.log('id', id)
      }
    }
  }
})

module.exports = UserTypeQuery
