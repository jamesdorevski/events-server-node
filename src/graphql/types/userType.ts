export const userType = `
    type Query {
        me: User!
    }   

    type Mutation {
        signup(username: String!, password: String!): AuthPayload
        login(username: String!, password: String!): AuthPayload
    }

    type AuthPayload {
        token: String
        user: User
    }

    type User {
        id: ID!
        username: String!
        password: String!
        created: String!
        modified: String!
    }
`;

