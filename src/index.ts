import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  
  type Product {
    id: ID
    name: String!
    description: String!
    price: Float!
    soldout: Soldout
    stores: [Store]
  }

  input StoreInput {
    id: ID
    name: String
    }

    enum Soldout {
        SOLDOUT
        ONSALE
    }

  input ProductInput {
    name: String
    description: String
    price: Float
    soldout: Soldout
    stores: [StoreInput]
  }

  type Store {
    id: ID
    name: String
  }

  type Query {
    getProduct(id: ID!): Product
  }

  type Query {
    product: [Product]
  }

  type Query {
    getProducts: [Product]
    }

  type Mutation {
    createProduct(input: ProductInput): Product
    }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs ApolloServer instance as middleware
//  3. prepares app to handle incoming requests
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}
startServer();


