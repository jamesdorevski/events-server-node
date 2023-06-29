const { GraphQLSchema } = require('graphql')
const mutationTypes = require('./mutations')

const schema = new GraphQLSchema({
  mutation: mutationTypes
})

// const schema = buildSchema(`
//     input NewUserInput {
//         username: String!,
//         password: String!
//     }

//     type User {
//         id: ID!,
//         username: String!,
//         password: String!,
//         createdAt: String!,
//         updatedAt: String!
//     }

//     type Mutation {
//       createUser(input: NewUserInput): User
//     }

//     type Query {
//       getUser(id: ID!): User
//     }
// `)

module.exports = schema
