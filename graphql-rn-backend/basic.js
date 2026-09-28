//post

// import {ApolloServer} from "@apollo/server"
// import {startStandaloneServer} from "@apollo/server/standalone"

// const users =[
//   {
//     id:1,
//     name:"Viz" 
//   },
//   {
//     id:2,
//     name:"Jaxx" 
//   }
// ]


// const roles =[
//   {
//     id:1,
//     role:"Native" 
//   },
//   {
//     id:2,
//     role:"Web" 
//   }
// ]

// const typeDefs= `#graphql
//   type User{
//     id:ID
//     name:String
//   }

//   type Role{
//     id:ID
//     role:String
//   }

//   type Query{
//     users:[User]
//     roles:[Role]
//     user(id:ID):User
//     role(id:ID):Role
//   }

//   type Mutation{
//     createUser(name: String!):User
//   }

  

// `

// const resolvers= {
//   Query:{
//     users:()=>users,
//     user:(_,args)=>{
//       return users.find(user=>user.id==args.id)
//     },
//     roles:()=> roles,
//     role:(_,args)=>{
//       return roles.find(role=> role.id==Number(args.id))
//     }
//   },

//   Mutation:{
//     createUser:(_,args)=>{
//       const newUser ={
//         id:users.length+1,
//         name:args.name
//       };
//       users.push(newUser);

//       return newUser;
//     }
//   }
// }

// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// })

// const {url} = await startStandaloneServer(server,{
//   listen:{port:4000}
// })

// console.log(`Server running at ${url}`);


// Get query with params


// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";

// const users = [
//   { id: 1, name: "Vignesh" },
//   { id: 2, name: "Rahul" }
// ];

// const roles =[
//   {id:1,role:"React native"},
//   {id:2,role:"Node JS"},
// ]

// const typeDefs= `#graphql
//   type User{
//     id:ID
//     name: String
//   }

//   type Roles{
//     id:ID
//     role: String
//   }

//   type Query{
//     users:[User]
//     user(id:ID):User
//     roles:[Roles]
//     role(id:ID):Roles
//   }

// `

// const resolvers ={
//   Query:{
//     users:()=> users,
//     user:(_,args)=>{
//       return users.find(user=>user.id == Number(args.id));
//     },
//     roles:()=> roles,
//     role:(_,args)=>{
//       return roles.find(role=>role.id == Number(args.id))
//     }
//   }
// }


// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// })

// const {url} = await startStandaloneServer(server,{
//   listen:{
//     port:4000
//   }
// })



// console.log(`Server running at ${url}`);


//-------------------------
// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";

// const users = [
//   { id: 1, name: "Vignesh" },
//   { id: 2, name: "Rahul" }
// ];

// const typeDefs = `#graphql
//   type User {
//     id: ID
//     name: String
//   }

//   type Query {
//     users: [User]
//   }
// `;

// const resolvers = {
//   Query: {
//     users: () => users
//   }
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// });

// const { url } = await startStandaloneServer(server, {
//   listen: {
//     port: 4000
//   }
// });

// console.log(`Server running at ${url}`);

//----------------------------------------------------

// ApolloServer → creates the GraphQL server
import { ApolloServer } from "@apollo/server";

// startStandaloneServer → starts the Apollo GraphQL server over HTTP
import { startStandaloneServer } from "@apollo/server/standalone";


// --------------------------------------------------
// 1. ACTUAL DATA
// --------------------------------------------------

// Normal JavaScript data.
// GraphQL does NOT store this data.
// The resolver will return this data to GraphQL.
const users = [
  { id: 1, name: "Vignesh" },
  { id: 2, name: "Rahul" }
];

const roles = [
  { id: 1, role: "React native" },
  { id: 2, role: "Node JS" },
];


// --------------------------------------------------
// 2. SCHEMA / TYPE DEFINITIONS
// --------------------------------------------------

// typeDefs → defines WHAT the GraphQL API provides.
//
// type → defines the shape/structure of data
// field → individual piece of data
//
// User means:
// User has an id and name.
//
// Roles means:
// Roles has an id and role.
//
// type Query → defines the READ operations available
// to the GraphQL client.
//
// users: [User]
// → users query returns a list of User objects
//
// roles: [Roles]
// → roles query returns a list of Roles objects.

const typeDefs = `#graphql

  type User {
    id: ID
    name: String
  }
  type Roles {
    id: ID
    role: String
  }
  type Query {
    users: [User]
    roles: [Roles]
  }
`;


// --------------------------------------------------
// 3. RESOLVERS
// --------------------------------------------------

// Resolver → tells GraphQL HOW to get the actual data.
//
// The names here must match the fields defined
// inside type Query.
//
// Query.users
// → returns the JavaScript users array
//
// Query.roles
// → returns the JavaScript roles array

const resolvers = {
  Query: {

    // Client asks for "users"
    // → this resolver runs
    // → returns the users JavaScript array
    users: () => users,

    // Client asks for "roles"
    // → this resolver runs
    // → returns the roles JavaScript array
    roles: () => roles

  }
};


// --------------------------------------------------
// 4. CREATE GRAPHQL SERVER
// --------------------------------------------------

// Connect the schema definitions (typeDefs)
// with the resolver functions (resolvers).
//
// typeDefs → WHAT the API provides
// resolvers → HOW the API gets the data

const server = new ApolloServer({
  typeDefs,
  resolvers
});


// --------------------------------------------------
// 5. START SERVER
// --------------------------------------------------

// Starts the GraphQL server on port 4000.
//
// startStandaloneServer makes the GraphQL API
// available through HTTP.
//
// After starting, "url" contains the server URL.

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000
  }
});


// Print the server URL in the terminal
console.log(`Server running at ${url}`);

//--------------------------------------------------------

