/** @format */

import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../Types/Context";
// import { User } from "../Entities/User";
import { AuthenticationError } from "apollo-server-express";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    if (!context.req.session.userId) {
      throw new AuthenticationError("Not Authorized!!");
    }
    return next();
  } catch (error) {
    throw new AuthenticationError("Not Authorized!");
  }
};
