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
import { createCycleReviewInput, getCycleReviewsInput } from "./Inputs";
import {
  createCycleReviewUtil,
  deleteReviewUtil,
  getAllReviewsUtil,
  updateReviewUtil,
} from "./Utils";
import { CycleReviewResponse } from "../../Types/Response";
import { MyContext } from "../../Types/Context";

@Resolver()
export class CycleReviewResolvers {
  @UseMiddleware(isAuth)
  @Mutation(() => CycleReviewResponse)
  async createCycleReview(
    @Arg("data") { cycleId, data }: createCycleReviewInput,
    @Ctx() ctx: MyContext
  ) {
    try {
      const savedData = await createCycleReviewUtil({
        cycleId,
        data,
        userId: ctx.req.session.userId,
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
        error: `Error : ${error.detail}`,
      };
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => CycleReviewResponse)
  async getCycleReviews(
    @Arg("data") { pageNo, limit, cycleId }: getCycleReviewsInput
  ) {
    try {
      const data = await getAllReviewsUtil({ pageNo, limit, cycleId });
      return {
        data: data,
        message: "Fetch Successful",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessful",
        error: `Error : ${error.detail}`,
      };
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => CycleReviewResponse)
  async updateReview(
    @Arg("review_id") review_id: string,
    @Arg("review") review: string,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data = await updateReviewUtil({
        userId: ctx.req.session.userId,
        reviewId: review_id,
        data: review,
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

  @UseMiddleware(isAuth)
  @Mutation(() => CycleReviewResponse)
  async deleteCycleReview(
    @Arg("reviewId") reviewId: string,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data = await deleteReviewUtil({
        userId: ctx.req.session.userId,
        reviewId: reviewId,
      });
      return {
        data: data,
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
