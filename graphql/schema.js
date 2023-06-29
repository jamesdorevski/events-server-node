const { buildSchema } = require('graphql')

const schema = buildSchema(`
    type User {
        id: ID!,
        username: String!,
        password: String!,
        createdAt: String!,
        updatedAt: String!
    }    

    type Mutation {
      createUser(username: String!, password: String!): User
    }

    type Query {
      getUser(id: ID!): User
    }
`)

module.exports = schema
