/** @format */

import { isAuth } from "../../Middlewares/isAuth";
import { MyContext } from "../../Types/Context";
import { ProfitResponse, RideResponse } from "../../Types/Response";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { profits, ridesDone, getRidesTakenUtil } from "./Utils";
import { findRidesDoneInput, ridesTakenInput } from "./Inputs";

@Resolver()
export class LogisticsResolver {
  @UseMiddleware(isAuth)
  @Query(() => ProfitResponse)
  async getProfitsfromRenting(@Ctx() ctx: MyContext) {
    try {
      const { data, profit } = await profits({
        user_id: ctx.req.session.userId,
      });
      return {
        Profit: profit,
        Cycles: data,
        message: "Message Successful",
        error: null,
      };
    } catch (error) {
      return {
        Profit: null,
        Cycles: null,
        message: "Message Unsuccessful",
        error: `Error : ${error.message}`,
      };
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => RideResponse)
  async getRidesDonebyCycle(
    @Arg("data") { cycle_id, limit, pageNo }: findRidesDoneInput
  ) {
    try {
      const data = await ridesDone({
        cycle_id,
        limit,
        pageNo,
      });
      return {
        data: data,
        message: "Message Successful",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Message Unsuccessful",
        error: `Error : ${error.message}`,
      };
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => String, {
    description: "This is the Query that returns all the rides taken by a user",
  })
  async getRidesTaken(
    @Arg("data") { limit, pageNo }: ridesTakenInput,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data=await getRidesTakenUtil({
        limit,
        pageNo,
        userId: ctx.req.session.userId,
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
        error: `Error : ${error.message}`,
      };
    }
  }
}
