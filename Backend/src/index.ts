/** @format */

import "reflect-metadata";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import Express, { Application } from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { HelloResolver } from "./Resolvers/HelloResolver";
import { UserResolvers } from "./Resolvers/Users/Index";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import redis from "redis";
import { LoginResolver } from "./Resolvers/Login";
import { UserReviewsResolver } from "./Resolvers/User Reviews/Index";
import { CycleResolver } from "./Resolvers/Cycles/Index";
import { CycleReviewResolvers } from "./Resolvers/Cycle Reviews/Index";
import { RideResolvers } from "./Resolvers/Ride/Index";
import { ChatResolver } from "./Resolvers/Chats/Index";
import { LogisticsResolver } from "./Resolvers/Logistics/Index";

declare module "express-session" {
  export interface Session {
    userId: string;
  }
}

const main = async () => {
  const port = 3000;
  await createConnection();
  const schema = await buildSchema({
    resolvers: [
      HelloResolver,
      ChatResolver,
      UserResolvers,
      LoginResolver,
      UserReviewsResolver,
      CycleResolver,
      CycleReviewResolvers,
      RideResolvers,
      LogisticsResolver,
    ],
  });
  const apolloserver = new ApolloServer({
    schema: schema,
    playground: true,
    context: ({ req, res }: any) => ({ req, res }),
  });
  const app: Application = Express();

  const RedisStore = connectRedis(session);

  const redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
  });

  redisClient.on("error", function (err) {
    console.log("Could not establish a connection with redis. " + err);
  });
  redisClient.on("connect", function () {
    console.log("Connected to redis successfully");
  });

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  apolloserver.applyMiddleware({ app });
  const httpServer = createServer(app);
  apolloserver.installSubscriptionHandlers(httpServer);
  httpServer.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${apolloserver.graphqlPath}`
    );
  });
};

main();
