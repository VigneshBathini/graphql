# GraphQL — Fundamentals

## Installation

```bash
npm i @apollo/server graphql
```

---

# 1. GraphQL

**Definition:** GraphQL is an API query language that allows a client to request the specific data and fields it needs from a server.

### Simple idea

**REST**

```text
Client → Endpoint → Server decides response
```

**GraphQL**

```text
Client → Query → Server returns requested fields
```

### Remember

```text
GraphQL lets the client describe the data it wants.
```

---

# 2. GraphQL Schema

**Definition:** The schema is the complete contract/blueprint of a GraphQL API.

It defines:

* What types of data exist
* What fields those types contain
* What data can be queried
* What data can be modified
* What arguments are accepted
* What type of data is returned

### Example

```graphql
type User {
  id: ID
  name: String
}

type Query {
  users: [User]
}
```

Here, the complete set of definitions forms the API's schema.

### Remember

```text
Schema = Complete API contract
```

---

# 3. GraphQL Type

**Definition:** A type describes the structure/shape of a particular kind of data.

### Example

```graphql
type User {
  id: ID
  name: String
}
```

Here:

```text
User = Type
```

It says that a User has:

```text
id   → ID
name → String
```

### Remember

```text
Type = Shape of one kind of data
```

---

# 4. typeDefs — Apollo Server Term

**Definition:** `typeDefs` is a JavaScript variable that contains the GraphQL type definitions/schema definitions that we give to Apollo Server.

### Example

```js
const typeDefs = `#graphql

  type User {
    id: ID
    name: String
  }

  type Query {
    users: [User]
  }

`;
```

`typeDefs` is not a separate GraphQL concept like `User` or `Query`.

It is simply the commonly used variable name for storing the GraphQL definitions.

### Remember

```text
typeDefs
   ↓
GraphQL definitions written in code
   ↓
Apollo Server
   ↓
uses them to construct the GraphQL schema
```

---

# 5. Relationship: Schema vs Type vs typeDefs

This is the important distinction.

```text
SCHEMA
Complete GraphQL API contract
        │
        ├── Type: User
        ├── Type: Product
        ├── Query
        └── Mutation
```

And in Apollo Server:

```text
typeDefs
   ↓
contains GraphQL definitions
   ↓
Apollo Server
   ↓
uses them to construct the schema
```

### Easy analogy

```text
Schema  = Complete blueprint

Type    = One building block in the blueprint

typeDefs = Code/document containing the definitions
```

### Don't memorize this incorrectly

```text
Schema = Type = typeDefs ❌
```

Instead:

```text
Schema
→ Complete API structure

Type
→ Individual data structure inside the schema

typeDefs
→ Code containing GraphQL definitions
```

---

# 6. Scalar Types

GraphQL provides basic built-in data types called scalar types.

| Type    | Meaning        | Example     |
| ------- | -------------- | ----------- |
| String  | Text           | `"Vignesh"` |
| Int     | Whole number   | `25`        |
| Float   | Decimal number | `99.50`     |
| Boolean | True/false     | `true`      |
| ID      | Identifier     | `"123"`     |

### Example

```graphql
type User {
  id: ID
  name: String
  age: Int
  salary: Float
  isActive: Boolean
}
```

---

# 7. Query

**Definition:** A Query is a GraphQL operation used to read/fetch data from the server.

### Example

```graphql
query {
  users {
    id
    name
  }
}
```

### Remember

```text
Query = READ / FETCH
```

Similar concept in REST:

```text
GraphQL Query ≈ REST GET
```

---

# 8. type Query

`type Query` defines the available read operations in the GraphQL schema.

### Example

```graphql
type Query {
  users: [User]
}
```

This means:

```text
The API provides a query called "users"
        ↓
It returns a list of User objects
```

Another example:

```graphql
type Query {
  users: [User]
  products: [Product]
}
```

The client can ask for:

```text
users
products
```

### Remember

```text
type Query
    ↓
Defines available READ operations
```

---

# 9. Resolver

**Definition:** A resolver is a function that provides the actual value/data for a GraphQL field.

### Example

```js
const resolvers = {

  Query: {

    users: () => users

  }

};
```

If the client asks:

```graphql
query {
  users {
    name
  }
}
```

GraphQL calls:

```js
users: () => users
```

and gets the actual data.

### Remember

```text
Schema / typeDefs
→ WHAT is available?

Resolver
→ HOW is the data obtained?
```

---

# 10. resolvers — Apollo Server Term

**Definition:** `resolvers` is a JavaScript object containing resolver functions.

### Example

```js
const resolvers = {

  Query: {

    users: () => users

  }

};
```

The structure generally follows the GraphQL schema.

```text
type Query
    ↓
users
    ↓
resolver
```

### Remember

```text
Resolver = Function that supplies data

resolvers = Object containing resolver functions
```

---

# 11. List Type [User]

### Example

```graphql
users: [User]
```

This means:

```text
users returns a list/array of User objects
```

### Example result

```json
[
  {
    "id": 1,
    "name": "Vignesh"
  },
  {
    "id": 2,
    "name": "Rahul"
  }
]
```

Compare:

```text
user: User

→ one User
```

```text
users: [User]

→ list of User objects
```

### Remember

```text
User   → one User
[User] → list of Users
```

---

# 12. GraphQL Client Query

The client chooses which fields it wants.

### Example

```graphql
query {
  users {
    id
    name
  }
}
```

The client is saying:

```text
"Give me users,
but from each user I want id and name."
```

It could request only:

```graphql
query {
  users {
    name
  }
}
```

Then the response contains only:

```json
[
  {
    "name": "Vignesh"
  },
  {
    "name": "Rahul"
  }
]
```

### Remember

```text
The client selects the fields it needs.
```

---

# 13. Apollo Server

**Definition:** Apollo Server is a Node.js library used to build and run a GraphQL API server.

### Example

```js
const server = new ApolloServer({
  typeDefs,
  resolvers
});
```

Here Apollo Server receives:

```text
typeDefs
   +
resolvers
   ↓
GraphQL Server
```

---

# 14. startStandaloneServer

**Definition:** `startStandaloneServer` starts the Apollo Server and makes it available over HTTP.

### Example

```js
const { url } = await startStandaloneServer(server, {

  listen: {
    port: 4000
  }

});
```

Meaning:

```text
Start server
    ↓
Listen on port 4000
    ↓
http://localhost:4000
```

---

# 15. Complete GraphQL Flow

```text
                 CLIENT
            React Native App
                  │
                  │ GraphQL Query
                  ↓
          ┌─────────────────┐
          │  GraphQL Server │
          │                 │
          │     Schema      │
          │       ↓         │
          │    Resolver     │
          │       ↓         │
          │   Actual Data   │
          └────────┬────────┘
                   │
                   ↓
                Response
```

### Example

```text
Client
  │
  │ query { users { name } }
  ↓
Schema
  │
  │ "users is valid"
  ↓
Resolver
  │
  │ users()
  ↓
Data
  │
  ↓
Response
```

---

# 16. Most Important Mental Model

When reading GraphQL code, think in this order:

### 1. TYPE

```text
What does the data look like?
```

### 2. QUERY

```text
What can the client read?
```

### 3. TYPEDEFS / SCHEMA

```text
What does the API allow?
```

### 4. RESOLVER

```text
How does the server provide the data?
```

### 5. CLIENT QUERY

```text
What fields does the client actually want?
```

---

# 17. GraphQL Arguments

**Definition:** Arguments allow the client to send values to a GraphQL field.

### Schema

```graphql
type Query {
  user(id: ID): User
}
```

### Client

```graphql
query {
  user(id: 2) {
    id
    name
  }
}
```

Here:

```text
user
 ↓
id: 2
 ↓
argument
```

### Resolver

```js
const resolvers = {

  Query: {

    user: (_, args) => {

      return users.find(
        user => user.id === Number(args.id)
      );

    }

  }

};
```

For:

```graphql
user(id: 2)
```

the resolver receives:

```js
args = {
  id: 2
};
```

Therefore:

```js
args.id
```

gives:

```text
2
```

### Remember

```text
Arguments
   ↓
Input values sent to a GraphQL field
```

---

# 18. GraphQL Variables

Variables allow the client to provide values separately from the query.

Instead of:

```graphql
query {
  user(id: 2) {
    id
    name
  }
}
```

we can use:

```graphql
query GetUser($id: ID) {

  user(id: $id) {
    id
    name
  }

}
```

### Variables

```json
{
  "id": 2
}
```

### Flow

```text
Variables
   ↓
$id = 2
   ↓
user(id: $id)
   ↓
backend argument
   ↓
args.id = 2
```

## Important distinction

```graphql
$id
```

is the **client variable**.

```graphql
id:
```

is the **GraphQL field argument**.

They don't have to have the same name.

### Example

```graphql
query GetUser($userId: ID) {

  user(id: $userId) {
    id
    name
  }

}
```

Variables:

```json
{
  "userId": 2
}
```

Backend still receives:

```js
args = {
  id: 2
};
```

### Remember

```text
$id
→ Client variable

id:
→ Backend argument

args.id
→ Resolver receives the value
```

---

# 19. Mutation

**Definition:** A Mutation is a GraphQL operation used to modify/change data.

Typical operations:

```text
CREATE
UPDATE
DELETE
```

### Schema

```graphql
type Mutation {
  createUser(name: String!): User
}
```

### Resolver

```js
const resolvers = {

  Mutation: {

    createUser: (_, args) => {

      const newUser = {
        id: users.length + 1,
        name: args.name
      };

      users.push(newUser);

      return newUser;
    }

  }

};
```

### Client

```graphql
mutation {
  createUser(name: "Kiran") {
    id
    name
  }
}
```

### Remember

```text
Query
→ READ

Mutation
→ CHANGE DATA
```

Similar REST concepts:

```text
GraphQL Query     ≈ GET

GraphQL Mutation  ≈ POST / PUT / PATCH / DELETE
```

This is a conceptual comparison, not a strict one-to-one mapping.

---

# 20. Mutation + Variables

Instead of putting the value directly:

```graphql
mutation {
  createUser(name: "Kiran") {
    id
    name
  }
}
```

we can use variables:

```graphql
mutation CreateUser($name: String!) {

  createUser(name: $name) {
    id
    name
  }

}
```

### Variables

```json
{
  "name": "Kiran"
}
```

### Flow

```text
$name
  ↓
"Kiran"
  ↓
createUser(name: $name)
  ↓
args.name
  ↓
"Kiran"
```

---

# 21. Input Types

**Definition:** An input type defines the structure of data sent into a GraphQL field, usually a mutation.

### Example

```graphql
input CreateUserInput {
  name: String!
  roleId: ID!
}
```

### Mutation

```graphql
type Mutation {
  createUser(input: CreateUserInput!): User
}
```

Instead of sending many individual arguments:

```graphql
createUser(
  name: "Kiran"
  roleId: 1
)
```

we can send one structured input:

```graphql
createUser(
  input: {
    name: "Kiran"
    roleId: 1
  }
)
```

### Client with Variables

```graphql
mutation CreateUser($input: CreateUserInput!) {

  createUser(input: $input) {
    id
    name
  }

}
```

### Variables

```json
{
  "input": {
    "name": "Kiran",
    "roleId": 1
  }
}
```

### Resolver

```js
createUser: (_, args) => {

  console.log(args);

  const newUser = {

    id: users.length + 1,

    name: args.input.name,

    roleId: Number(args.input.roleId)

  };

  users.push(newUser);

  return newUser;
}
```

`args` looks like:

```js
{
  input: {
    name: "Kiran",
    roleId: 1
  }
}
```

Therefore:

```js
args.input.name
```

→ `"Kiran"`

```js
args.input.roleId
```

→ `1`

### Remember

```text
args
 ↓
input
 ↓
field
```

---

# 22. Nested Queries

GraphQL allows related data to be requested in one query.

### Schema

```graphql
type User {
  id: ID
  name: String
  role: Role
}

type Role {
  id: ID
  role: String
}
```

### Data

```js
const users = [
  {
    id: 1,
    name: "Vignesh",
    roleId: 1
  },
  {
    id: 2,
    name: "Rahul",
    roleId: 2
  }
];

const roles = [
  {
    id: 1,
    role: "React Native"
  },
  {
    id: 2,
    role: "Node JS"
  }
];
```

### Nested Resolver

```js
User: {

  role: (user) => {

    return roles.find(
      role => role.id === user.roleId
    );

  }

}
```

### Client Query

```graphql
query {

  users {

    id
    name

    role {
      id
      role
    }

  }

}
```

### Flow

```text
User
 ↓
roleId
 ↓
User.role resolver
 ↓
find matching Role
 ↓
Role object
```

---

# 23. Parent in a Resolver

Resolver functions commonly follow this structure:

```js
(parent, args, context, info)
```

Example:

```js
User: {

  role: (user) => {

    return roles.find(
      role => role.id === user.roleId
    );

  }

}
```

Here:

```text
user
 ↓
parent User object
```

Example parent:

```js
{
  id: 1,
  name: "Vignesh",
  roleId: 1
}
```

The resolver can access:

```js
user.id
user.name
user.roleId
```

### What is `_`?

You may see:

```js
role: (_, args) => {
```

`_` is simply a JavaScript variable name/convention used when the first parameter is not needed.

Resolver parameters:

```text
(parent, args, context, info)
```

So:

```js
(_, args)
```

means:

```text
parent → not needed
args   → needed
```

---

# 24. Nested Mutation

We can combine:

* Mutation
* Variables
* Input Type
* Nested Resolver

### Complete schema

```graphql
type User {
  id: ID
  name: String
  role: Role
}

type Role {
  id: ID
  role: String
}

input CreateUserInput {
  name: String!
  roleId: ID!
}

type Mutation {
  createUser(input: CreateUserInput!): User
}
```

### Mutation Resolver

```js
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
```

### Nested User Resolver

```js
User: {

  role: (user) => {

    return roles.find(
      role => role.id === user.roleId
    );

  }

}
```

### Client Mutation

```graphql
mutation CreateUser($input: CreateUserInput!) {

  createUser(input: $input) {

    id
    name

    role {
      id
      role
    }

  }

}
```

### Variables

```json
{
  "input": {
    "name": "Kiran",
    "roleId": 1
  }
}
```

### Flow

```text
Client
  ↓
variables
  ↓
input
  ↓
createUser(input: $input)
  ↓
Mutation resolver
  ↓
args.input
  ↓
Create new user
  ↓
users.push(newUser)
  ↓
Return User
  ↓
User.role resolver
  ↓
Find Role using roleId
  ↓
Return Role
  ↓
GraphQL Response
```

---

# 25. Temporary Data vs Database

In our examples:

```js
const users = [
  { id: 1, name: "Vignesh" },
  { id: 2, name: "Rahul" }
];
```

This is a normal JavaScript array stored in Node.js memory.

When we do:

```js
users.push(newUser);
```

the data is added to that array.

### Before

```text
users
 ↓
Vignesh
Rahul
```

### After

```text
users
 ↓
Vignesh
Rahul
Kiran
```

But this is **temporary**.

If the Node.js server restarts:

```text
Server stops
     ↓
Memory cleared
     ↓
Array resets
     ↓
Newly added data disappears
```

A real application would normally use:

```text
GraphQL
   ↓
Resolver
   ↓
Database
   ↓
MySQL / PostgreSQL / MongoDB
```

---

# 26. Complete GraphQL Mental Model

```text
                    CLIENT
                       │
                       │
              Query / Mutation
                       │
                       ▼
              GraphQL Schema
                       │
              ┌────────┴────────┐
              │                 │
            Query            Mutation
              │                 │
            READ             CHANGE
              │                 │
         Arguments           Input
              │                 │
          Variables          Variables
              │                 │
              └────────┬────────┘
                       ↓
                    Resolver
                       ↓
                  Actual Data
                       ↓
               Nested Resolver
                       ↓
                    Response
```

---

# 27. Complete Example

```js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


// ============================================================
// DATA
// ============================================================

const users = [
  {
    id: 1,
    name: "Vignesh",
    roleId: 1
  },
  {
    id: 2,
    name: "Rahul",
    roleId: 2
  }
];

const roles = [
  {
    id: 1,
    role: "React Native"
  },
  {
    id: 2,
    role: "Node JS"
  }
];


// ============================================================
// SCHEMA / TYPEDEFS
// ============================================================

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


// ============================================================
// RESOLVERS
// ============================================================

const resolvers = {

  // ----------------------------------------------------------
  // QUERY RESOLVERS
  // ----------------------------------------------------------

  Query: {

    // Get all users
    users: () => {
      return users;
    },

    // Get one user
    user: (_, args) => {

      return users.find(
        user => user.id === Number(args.id)
      );

    },

    // Get all roles
    roles: () => {
      return roles;
    },

    // Get one role
    role: (_, args) => {

      return roles.find(
        role => role.id === Number(args.id)
      );

    }

  },


  // ----------------------------------------------------------
  // NESTED USER RESOLVER
  // ----------------------------------------------------------

  User: {

    role: (user) => {

      return roles.find(
        role => role.id === user.roleId
      );

    }

  },


  // ----------------------------------------------------------
  // MUTATION
  // ----------------------------------------------------------

  Mutation: {

    createUser: (_, args) => {

      const newUser = {

        id: users.length + 1,

        name: args.input.name,

        roleId: Number(args.input.roleId)

      };

      // Temporary in-memory storage
      users.push(newUser);

      return newUser;

    }

  }

};


// ============================================================
// APOLLO SERVER
// ============================================================

const server = new ApolloServer({
  typeDefs,
  resolvers
});


// ============================================================
// START SERVER
// ============================================================

const { url } = await startStandaloneServer(server, {

  listen: {
    port: 4000
  }

});

console.log(`Server running at ${url}`);
```

---

# Quick Revision

```text
GraphQL
→ API query language

Schema
→ Complete API contract / blueprint

Type
→ Shape of a particular kind of data

typeDefs
→ JavaScript variable containing GraphQL definitions

Scalar Types
→ String, Int, Float, Boolean, ID

Query
→ Read / fetch data

type Query
→ Defines available read operations

Arguments
→ Values sent to a GraphQL field

Variables
→ Values supplied separately from the query

Resolver
→ Function that provides actual data

resolvers
→ Object containing resolver functions

[User]
→ List / array of User objects

Mutation
→ Change data

Input Type
→ Structure of data sent into a field

Nested Query
→ Request related data inside another object

Nested Resolver
→ Resolver used to obtain related/nested data

Apollo Server
→ Node.js library for building/running GraphQL APIs

startStandaloneServer
→ Starts Apollo Server and exposes it over HTTP

args
→ Contains arguments sent to a resolver

args.input
→ Contains mutation input data

args.input.name
→ Accesses a field inside the input
```

# One-Line Memory Trick

```text
Type      → WHAT does this data look like?

Schema    → WHAT does the whole API provide?

typeDefs  → WHERE do I define the GraphQL definitions?

Query     → WHAT can I READ?

Arguments → WHAT value am I sending?

Variables → WHERE do I provide dynamic values?

Mutation  → WHAT data do I CHANGE?

Input     → WHAT structured data am I sending?

Resolver  → HOW do I get/change the data?

Nested    → HOW do related objects connect?
```

# Current Progress

```text
GraphQL Fundamentals
    ✅ GraphQL
    ✅ REST vs GraphQL
    ✅ Schema
    ✅ Type
    ✅ typeDefs
    ✅ Scalar Types
    ✅ Query
    ✅ type Query
    ✅ Resolver
    ✅ resolvers
    ✅ List Types
    ✅ Client Query
    ✅ Apollo Server
    ✅ startStandaloneServer

GraphQL Core
    ✅ Arguments
    ✅ Variables
    ✅ Nested Queries
    ✅ Mutation
    ✅ Mutation + Variables
    ✅ Input Types
    ✅ Nested Resolvers
    ✅ Nested Mutation
    ✅ Temporary in-memory data
```

**Next:** Error Handling → Authentication → Pagination → Apollo Client → React Native + Apollo Client.
