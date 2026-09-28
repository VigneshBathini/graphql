# React Native + Expo + Apollo Client + GraphQL

Beginner setup for connecting a React Native Expo application with a Node.js GraphQL API using Apollo Client.

---

# 1. What We Are Building

We have two separate applications:

```text
┌─────────────────────────────┐
│      React Native Expo      │
│                             │
│      Apollo Client          │
│          ↓                  │
│       useQuery()            │
└──────────────┬──────────────┘
               │
               │ HTTP
               ↓
┌─────────────────────────────┐
│     Node.js GraphQL API     │
│                             │
│      Apollo Server          │
│          ↓                  │
│       Resolver              │
│          ↓                  │
│        users[]              │
└─────────────────────────────┘
```

The React Native application is the **client**.

The Node.js application is the **GraphQL server**.

---

# 2. Technologies Used

## React Native Side

| Technology    | Purpose                                 |
| ------------- | --------------------------------------- |
| Expo          | Create and run React Native application |
| React Native  | Mobile application                      |
| Expo Router   | File-based navigation                   |
| Apollo Client | Connect React Native to GraphQL API     |
| GraphQL       | API query language                      |
| TypeScript    | Type safety                             |

## Backend Side

| Technology    | Purpose            |
| ------------- | ------------------ |
| Node.js       | JavaScript runtime |
| Apollo Server | GraphQL server     |
| GraphQL       | API query language |

---

# 3. Create Expo Project

Create the project:

```bash
npx create-expo-app@latest graphql-rn-client
```

Move into the project:

```bash
cd graphql-rn-client
```

Start Expo:

```bash
npx expo start
```

---

# 4. Install Apollo Client

Install Apollo Client and GraphQL:

```bash
npm install @apollo/client graphql
```

We are using Apollo Client 4.x.

---

# 5. Project Structure

Our important files are:

```text
graphql-rn-client/
│
├── src/
│   └── app/
│       ├── _layout.tsx
│       └── index.tsx
│
├── apollo.js
├── package.json
└── ...
```

The important files:

```text
apollo.js
    ↓
Apollo Client configuration

_layout.tsx
    ↓
ApolloProvider

index.tsx
    ↓
GraphQL query + UI
```

---

# 6. Apollo Client Setup

Create:

```text
apollo.js
```

Add:

```js
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://192.168.1.128:4000/",
  }),

  cache: new InMemoryCache(),
});

export default client;
```

---

# 7. Understanding `ApolloClient`

The important part is:

```js
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://192.168.1.128:4000/",
  }),
  cache: new InMemoryCache(),
});
```

## `ApolloClient`

Creates the Apollo Client instance.

```js
new ApolloClient(...)
```

It manages communication between React Native and the GraphQL server.

---

# 8. What is `HttpLink`?

```js
new HttpLink({
  uri: "http://192.168.1.128:4000/",
})
```

`HttpLink` tells Apollo where the GraphQL server is located.

In our case:

```text
http://192.168.1.128:4000/
```

The request goes from:

```text
React Native
     ↓
HttpLink
     ↓
192.168.1.128:4000
     ↓
Apollo Server
```

---

# 9. Why Not `localhost`?

If React Native is running on a physical Android phone:

```text
localhost
```

means:

```text
the phone itself
```

It does NOT mean your computer.

Therefore we use the computer's local IP:

```text
192.168.1.128
```

Example:

```js
uri: "http://192.168.1.128:4000/"
```

Your actual IP may be different.

Find it on Windows:

```bash
ipconfig
```

Look for:

```text
IPv4 Address
```

Example:

```text
192.168.1.128
```

Your phone and computer should be connected to the same network.

---

# 10. Android Emulator

If you're using the Android emulator instead of a physical phone, you can usually use:

```js
uri: "http://10.0.2.2:4000/"
```

So:

```text
Physical Android
→ computer local IP

Android Emulator
→ 10.0.2.2
```

---

# 11. What is `InMemoryCache`?

```js
cache: new InMemoryCache()
```

Apollo Client stores GraphQL data in memory.

For example:

```text
Server
   ↓
users
   ↓
Apollo Cache
   ↓
React Native
```

This allows Apollo Client to manage previously fetched GraphQL data.

We will learn caching properly later.

---

# 12. ApolloProvider

Open:

```text
src/app/_layout.tsx
```

Add:

```tsx
import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client/react";

import client from "../../apollo";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
}
```

> Adjust `../../apollo` if your `apollo.js` is located at a different path.

---

# 13. What is `ApolloProvider`?

`ApolloProvider` makes the Apollo Client available to React components.

```text
ApolloProvider
      ↓
   Screens
      ↓
   useQuery()
   useMutation()
```

Without `ApolloProvider`, components cannot access the Apollo Client through Apollo React hooks.

---

# 14. Why is ApolloProvider in `_layout.tsx`?

Expo Router uses `_layout.tsx` as a parent layout.

Therefore:

```text
_layout.tsx
     ↓
ApolloProvider
     ↓
index.tsx
other screens
other components
```

All screens inside the layout can use Apollo.

---

# 15. GraphQL Query

Open:

```text
src/app/index.tsx
```

We create a GraphQL query:

```tsx
const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;
```

This means:

```text
Get users
    ↓
Give me:
    id
    name
```

GraphQL allows the client to specify exactly which fields it needs.

---

# 16. What is `gql`?

Import:

```tsx
import { gql } from "@apollo/client";
```

`gql` is used to define a GraphQL document/query.

Example:

```tsx
const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;
```

---

# 17. `useQuery`

Import:

```tsx
import { useQuery } from "@apollo/client/react";
```

Then:

```tsx
const { data, loading, error } =
  useQuery<GetUsersData>(GET_USERS);
```

`useQuery()` sends the GraphQL query to the server.

---

# 18. `useQuery` Flow

```text
useQuery(GET_USERS)
       ↓
Apollo Client
       ↓
HttpLink
       ↓
GraphQL Server
       ↓
users resolver
       ↓
GraphQL response
       ↓
data
       ↓
React Native UI
```

---

# 19. `loading`

```tsx
const { data, loading, error } =
  useQuery<GetUsersData>(GET_USERS);
```

While the request is running:

```js
loading === true
```

We can show:

```tsx
if (loading) {
  return <Text>Loading...</Text>;
}
```

---

# 20. `error`

If something goes wrong:

```js
error
```

will contain the error information.

Example:

```tsx
if (error) {
  return <Text>Error: {error.message}</Text>;
}
```

---

# 21. `data`

When the GraphQL server successfully responds:

```js
data
```

contains the GraphQL response.

For our query:

```graphql
query {
  users {
    id
    name
  }
}
```

The response is approximately:

```json
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Vignesh"
      },
      {
        "id": "2",
        "name": "Rahul"
      }
    ]
  }
}
```

Therefore:

```js
data.users
```

contains the users array.

---

# 22. TypeScript Types

Because our Expo project uses TypeScript, we define the expected GraphQL response.

```tsx
type User = {
  id: string;
  name: string;
};

type GetUsersData = {
  users: User[];
};
```

---

# 23. Why `id` is a String?

Our GraphQL schema uses:

```graphql
id: ID
```

GraphQL's `ID` scalar is commonly represented as a string on the client.

Therefore:

```tsx
type User = {
  id: string;
  name: string;
};
```

---

# 24. Give the Type to `useQuery`

```tsx
const { data, loading, error } =
  useQuery<GetUsersData>(GET_USERS);
```

This tells TypeScript:

```text
data
 ↓
GetUsersData
 ↓
users
 ↓
User[]
```

Therefore TypeScript understands:

```js
data.users
```

and:

```js
user.id
user.name
```

---

# 25. Complete `index.tsx`

```tsx
import { View, Text } from "react-native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

type User = {
  id: string;
  name: string;
};

type GetUsersData = {
  users: User[];
};

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

export default function HomeScreen() {
  const { data, loading, error } =
    useQuery<GetUsersData>(GET_USERS);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      {data?.users.map((user) => (
        <Text key={user.id}>
          {user.id} - {user.name}
        </Text>
      ))}
    </View>
  );
}
```

---

# 26. Complete Apollo Setup

## `apollo.js`

```js
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://192.168.1.128:4000/",
  }),

  cache: new InMemoryCache(),
});

export default client;
```

## `_layout.tsx`

```tsx
import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client/react";

import client from "../../apollo";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
}
```

## `index.tsx`

```tsx
import { View, Text } from "react-native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

type User = {
  id: string;
  name: string;
};

type GetUsersData = {
  users: User[];
};

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

export default function HomeScreen() {
  const { data, loading, error } =
    useQuery<GetUsersData>(GET_USERS);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      {data?.users.map((user) => (
        <Text key={user.id}>
          {user.id} - {user.name}
        </Text>
      ))}
    </View>
  );
}
```

---

# 27. Backend GraphQL Server

Our React Native application connects to the GraphQL server we created earlier.

Basic server:

```js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: 1, name: "Vignesh", roleId: 1 },
  { id: 2, name: "Rahul", roleId: 2 },
];

const typeDefs = `#graphql

  type User {
    id: ID
    name: String
  }

  type Query {
    users: [User]
  }

`;

const resolvers = {
  Query: {
    users: () => users,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`Server running at ${url}`);
```

---

# 28. Run Backend

Inside the GraphQL server project:

```bash
npm start
```

Expected:

```text
Server running at http://localhost:4000/
```

---

# 29. Run React Native

Inside the Expo project:

```bash
npx expo start
```

For Android:

```bash
a
```

Or scan the QR code using Expo Go.

---

# 30. If You Change Apollo Configuration

Clear the Expo/Metro cache:

```bash
npx expo start -c
```

This is useful when you change imports or configuration and old bundled code is still being used.

---

# 31. Complete Request Flow

When the screen loads:

```text
1. Expo starts
        ↓
2. _layout.tsx loads
        ↓
3. ApolloProvider receives client
        ↓
4. index.tsx loads
        ↓
5. useQuery(GET_USERS)
        ↓
6. Apollo Client
        ↓
7. HttpLink
        ↓
8. POST request to GraphQL server
        ↓
9. Apollo Server
        ↓
10. Query resolver
        ↓
11. users()
        ↓
12. users array
        ↓
13. GraphQL response
        ↓
14. Apollo Client
        ↓
15. data.users
        ↓
16. React Native renders users
```

---

# 32. Important Terms to Remember

### Apollo Client

Client-side library used to communicate with a GraphQL API.

```text
React Native → Apollo Client → GraphQL API
```

### ApolloProvider

Makes Apollo Client available to React components.

```tsx
<ApolloProvider client={client}>
```

### HttpLink

Defines where the GraphQL server is located.

```js
new HttpLink({
  uri: "http://192.168.1.128:4000/",
})
```

### InMemoryCache

Apollo's client-side cache.

```js
new InMemoryCache()
```

### `gql`

Defines GraphQL queries.

```tsx
const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;
```

### `useQuery`

Executes a GraphQL query from a React component.

```tsx
useQuery(GET_USERS)
```

### `data`

Successful GraphQL response.

```tsx
data?.users
```

### `loading`

Request is currently running.

```tsx
if (loading)
```

### `error`

Request/query error.

```tsx
if (error)
```

---

# 33. Most Important Mental Model

Remember just this:

```text
ApolloProvider
      ↓
Apollo Client
      ↓
useQuery()
      ↓
GraphQL Query
      ↓
GraphQL Server
      ↓
Resolver
      ↓
Response
      ↓
data
      ↓
React Native UI
```

---

# 34. Current Learning Progress

Completed:

```text
GraphQL Basics
       ↓
Schema
       ↓
Types
       ↓
Queries
       ↓
Arguments
       ↓
Variables
       ↓
Nested Queries
       ↓
Mutations
       ↓
Input Types
       ↓
Nested Resolvers
       ↓
Error Handling
       ↓
Authentication Basics
       ↓
Pagination Basics
       ↓
Apollo Client
       ↓
Expo + Apollo Client
       ↓
ApolloProvider
       ↓
useQuery
       ↓
GraphQL → React Native
```

---

# 35. Next Topics

The next practical topics are:

```text
useMutation()
      ↓
Create User from React Native
      ↓
Variables
      ↓
Loading / Error handling
      ↓
Apollo Cache
      ↓
Refetching
      ↓
JWT Authentication
      ↓
Apollo Client + JWT
      ↓
Protected GraphQL APIs
```

The immediate next step is:

```text
React Native
     ↓
useMutation()
     ↓
createUser
     ↓
GraphQL Server
     ↓
users.push()
     ↓
New User
```

That will complete the basic **React Native + GraphQL CRUD flow**.
