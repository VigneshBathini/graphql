import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// -------------------------
// Data
// -------------------------

const users = [
  { id: 1, name: "Vignesh", roleId: 1 },
  { id: 2, name: "Rahul", roleId: 2 }
];

const roles = [
  { id: 1, role: "React Native" },
  { id: 2, role: "Node JS" }
];

// -------------------------
// GraphQL Schema
// -------------------------

const typeDefs = `#graphql

  type User {
    id: ID
    name: String
    role: Role
  }

  type Role {
    id: ID
    role: String
  }

  type Query {
    users: [User]
    user(id: ID): User

    roles: [Role]
    role(id: ID): Role
  }

  input CreateUserInput {
    name: String!
    roleId: ID!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }

`;

// -------------------------
// Resolvers
// -------------------------

const resolvers = {

  Query: {

    users: () => {
      return users;
    },

    user: (_, args) => {
      const user= users.find(
        user => user.id === Number(args.id)
      );

      if(!user){
        throw new Error("User not found")
      }

      return user;
      
    },

    roles: () => {
      return roles;
    },

    role: (_, args) => {
      return roles.find(
        role => role.id === Number(args.id)
      );
    }

  },

  // Nested User resolver
  User: {

    role: (user) => {
      return roles.find(
        role => role.id === user.roleId
      );
    }

  },

  // Mutation
  Mutation: {

    createUser: (_, args) => {

      const newUser = {
        id: users.length + 1,
        name: args.input.name,
        roleId: Number(args.input.roleId)
      };

      users.push(newUser);

      return newUser;
    }

  }

};

// -------------------------
// Apollo Server
// -------------------------

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// -------------------------
// Start Server
// -------------------------

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000
  }
});

console.log(`Server running at ${url}`);