/** @format */

import { User } from "../Entities/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcryptjs from "bcryptjs";
import { MyContext } from "../Types/Context";
import { ApolloError } from "apollo-server-errors";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async Login(
    @Arg("Email") email: string,
    @Arg("Password") password: string,
    @Ctx() ctx: MyContext
  ) {
    try {
      const user = await User.findOne({ where: { Email: email } });
      if (!user) {
        throw new ApolloError("Invalid Credentials");
      }
      const valid = await bcryptjs.compare(password, user.Password);
      if (!valid) {
        throw new ApolloError("Invalid Credentials");
      }
      // console.log("The user is  ", user);

      ctx.req.session!.userId = user.id;
      return user;
    } catch (error) {
      throw new ApolloError("Invalid Credentials");
    }
  }

  @Mutation(() => String, { nullable: true })
  async Logout(@Ctx() ctx: MyContext) {
    ctx.res.clearCookie("qid");
    return "Logout Successful";
  }
}
