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
import {
  createReviewInput,
  deleteUserReviewInput,
  getReviewsInput,
  updateUserReviewInput,
} from "./Inputs";
import {
  createReviewUtil,
  reviewsForMeUtil,
  deleteReviewUtil,
  reviewsByMeUtil,
  updateReviewUtil,
} from "./Utils";
import { MyContext } from "../../Types/Context";
import { UserReviewResponse } from "../../Types/Response";

@Resolver()
export class UserReviewsResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => UserReviewResponse)
  async createUserReview(
    @Arg("data") { data, refers_to, stars }: createReviewInput,
    @Ctx() ctx: MyContext
  ) {
    try {
      const saveddata = await createReviewUtil({
        data,
        refers_to,
        stars,
        userId: ctx.req.session!.userId,
      });
      return {
        data: [saveddata],
        message: "Fetch Successfull",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessfull",
        error: `Error : ${error.message}`,
      };
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UserReviewResponse)
  async updateUserReview(@Arg("data") { data, id }: updateUserReviewInput) {
    try {
      const savedData = await updateReviewUtil({
        data,
        id,
      });
      return {
        data: [savedData],
        message: "Fetch Successfull",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessfull",
        error: `Error : ${error.message}`,
      };
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UserReviewResponse)
  async deleteUserReview(@Arg("data") { id }: deleteUserReviewInput) {
    try {
      const savedData = await deleteReviewUtil(id);
      return {
        data: [savedData],
        message: "Fetch Successfull",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessfull",
        error: `Error : ${error.message}`,
      };
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => UserReviewResponse)
  async rebiewsByMe(@Arg("data") { limit, pageNo, userId }: getReviewsInput) {
    try {
      const data = await reviewsByMeUtil({
        userId: userId,
        limit,
        pageNo,
      });
      return {
        data: data,
        message: "Fetch Successfull",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessfull",
        error: `Error : ${error.message}`,
      };
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => UserReviewResponse)
  async reviewsForMe(@Arg("data") { limit, pageNo, userId }: getReviewsInput) {
    try {
      const data = await reviewsForMeUtil({
        userId: userId,
        limit,
        pageNo,
      });
      return {
        data: data,
        message: "Fetch Successfull",
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessfull",
        error: `Error : ${error.message}`,
      };
    }
  }
}
