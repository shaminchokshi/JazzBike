/** @format */

import { isAuth } from "../../Middlewares/isAuth";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { createCycleInput, updateCycleDetails } from "./Inputs";
import {
  createCycleUtil,
  getCycleDetails,
  updateCycleDetailsUtil,
  deleteCycleUtil,
  searchCycleUtil,
} from "./Utils";
import { CycleResponse } from "../../Types/Response";
import { MyContext } from "../../Types/Context";

@Resolver()
export class CycleResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => CycleResponse)
  async addCycle(
    @Arg("data")
    { Name, Photos, Price, Specifications }: createCycleInput,
    @Ctx() ctx: MyContext
  ) {
    try {
      const savedData = await createCycleUtil({
        Name,
        Photos,
        userId: ctx.req.session.userId,
        Price,
        Specifications,
      });
      return {
        data: [savedData],
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

  @Query(() => CycleResponse)
  async getCycleDetail(@Arg("id") id: string) {
    try {
      const data = await getCycleDetails(id);
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
  @Query(() => CycleResponse)
  async getMyCycles(@Ctx() ctx: MyContext) {
    try {
      const data = await getCycleDetails(ctx.req.session.userId);
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
  @Mutation(() => CycleResponse)
  async updateCycle(
    @Arg("data")
    { cycleId, Name, Photos, Price, Specifications }: updateCycleDetails,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data = await updateCycleDetailsUtil({
        cycleId,
        userId: ctx.req.session.userId,
        Name,
        Photos,
        Price,
        Specifications,
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
  @Mutation(() => CycleResponse)
  async deleteCycle(@Arg("cycleId") cycleId: string, @Ctx() ctx: MyContext) {
    try {
      const data =await deleteCycleUtil({
        cycleId: cycleId,
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
        error: null,
      };
    }
  }

  @Query(() => CycleResponse)
  async searchCycles(@Arg("data") data: string) {
    try {
      const searchedData = await searchCycleUtil(data);
      return {
        data: searchedData,
        message: "Fetch Successful",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessful",
        error: null,
      };
    }
  }
}
