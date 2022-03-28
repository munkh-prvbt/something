import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { schema } from "./schema";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";

const init = async () => {
  await mongoose.connect("mongodb://localhost:27017/chat", {});
  console.log(`Mongoose connection done 😹`);

  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors());

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  httpServer.listen(4000, () => {
    console.log(
      `It's up on http://localhost:${3001}${apolloServer.graphqlPath} 😼`
    );
  });
};

init().catch((error) => console.log(error));
