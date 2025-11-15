const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

const app = express();
app.use(cors());

// 1. GraphQL Schema
const typeDefs = gql`
  type Doctor {
    username: String
    name: String
    specialization: String
    email: String
  }

  type Query {
    doctor: Doctor
  }
`;

// 2. GraphQL Resolvers
const resolvers = {
  Query: {
    doctor: async () => {
      // Node 18+ supports fetch globally (no import needed)
      const res = await fetch("http://localhost:3000/doctor/current");
      const json = await res.json();
      return json.success ? json.user : null;
    }
  }
};

// 3. Start Server
async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(5000, () =>
    console.log("Doctor GraphQL Server running at http://localhost:5000/graphql")
  );
}

start();

