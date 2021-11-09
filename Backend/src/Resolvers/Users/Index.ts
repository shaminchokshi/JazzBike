/** @format */

import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CreateUserInput, searchUsersInput, updateUserInput } from "./Inputs";
import {
  createUserUtil,
  deleteUserUtil,
  findSpecificUserUtil,
  MeUtil,
  searchUsersUtil,
  updateUserUtil,
} from "./Utils/Utils";
import { ResponseObject } from "../../Types/Response";
import { isAuth } from "../../Middlewares/isAuth";
import { MyContext } from "../../Types/Context";

@Resolver()
export class UserResolvers {
  @Mutation(() => ResponseObject)
  async createUser(
    @Arg("input")
    { Name, PhoneNumber, Email, Address, Password }: CreateUserInput
  ) {
    try {
      const data = await createUserUtil({
        Address,
        Email,
        Name,
        Password,
        PhoneNumber,
      });
      return {
        data: [data],
        message: "Fetch Successful",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessful",
        error: error.detail,
      };
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => ResponseObject)
  async me(@Ctx() ctx: MyContext) {
    try {
      const data = await MeUtil(ctx.req.session.userId);
      return {
        data: [data],
        message: "Fetch Successful",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessful",
        error: error.detail,
      };
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => ResponseObject)
  async updateUser(
    @Arg("input")
    { Name, PhoneNumber, Email, Address, Password }: updateUserInput,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data = await updateUserUtil({
        userId: ctx.req.session.userId,
        Name,
        PhoneNumber,
        Email,
        Address,
        Password,
      });
      return {
        data: [data],
        message: "Fetch Successful",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unuccessful",
        error: `Error : ${error.message}`,
      };
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => ResponseObject)
  async deleteUser(@Ctx() ctx: MyContext) {
    try {
      await deleteUserUtil(ctx.req.session!.userId);
      return {
        data: null,
        message: "Fetch Successful",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unuccessful",
        error: `Error : ${error.message}`,
      };
    }
  }

  @Query(() => ResponseObject)
  async searchUsers(@Arg("data") { name, limit, pageNo }: searchUsersInput) {
    try {
      const SearchData = await searchUsersUtil({ name, limit, pageNo });
      return {
        data: SearchData,
        message: "Fetch Successful",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unuccessful",
        error: `Error : ${error.message}`,
      };
    }
  }

  @Query(() => ResponseObject)
  async searchSpecificUser(@Arg("userId") userId: string) {
    try {
      const data = await findSpecificUserUtil(userId);
      return {
        data: [data],
        message: "Fetch Successful",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unuccessful",
        error: `Error : ${error.message}`,
      };
    }
  }
}
