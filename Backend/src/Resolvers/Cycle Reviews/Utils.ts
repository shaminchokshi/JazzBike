/** @format */

import { Cycles } from "../../Entities/Cycles";
import { CycleReview } from "../../Entities/Cycle_Review";
import { User } from "../../Entities/User";
import { v4 as uuidv4 } from "uuid";
import { ApolloError } from "apollo-server-errors";

export const createCycleReviewUtil = async ({ cycleId, data, userId }: any) => {
  try {
    const cycle = await Cycles.findOne({
      where: { cycle_id: cycleId },
    });
    const user = await User.findOne({
      where: { id: userId },
    });
    return CycleReview.create({
      review_id: uuidv4(),
      cycle: cycle,
      reviewer: user,
      data: data,
    }).save();
  } catch (error) {
    throw new Error("The Cycle could not be created because of some Problem");
  }
};

export const getAllReviewsUtil = async ({ cycleId, limit, pageNo }: any) => {
  try {
    var skip = (pageNo - 1) * limit;
    const review_data = await CycleReview.find({
      relations: ["cycle", "reviewer"],
      where: {
        cycle: cycleId,
      },
      take: limit,
      skip: skip,
      order: { createdAt: "DESC" },
    });
    return review_data;
  } catch (error) {
    throw new ApolloError("Some Error Occured");
  }
};

export const updateReviewUtil = async ({ userId, reviewId, data }: any) => {
  try {
    const review_data = await CycleReview.findOne({
      relations: ["cycle", "reviewer"],
      where: {
        review_id: reviewId,
      },
    });
    if (review_data?.reviewer.id !== userId || review_data === undefined) {
      throw new Error("Failed To update");
    }
    review_data!["data"] = data;
    return review_data.save();
  } catch (error) {
    throw new Error("Failed To update");
  }
};

export const deleteReviewUtil = async ({ userId, reviewId }: any) => {
  try {
    const review_data = await CycleReview.findOne({
      relations: ["reviewer"],
      where: {
        review_id: reviewId,
      },
    });
    if (review_data?.reviewer.id !== userId || review_data === undefined) {
      throw new Error("Failed To Delete");
    }
    await CycleReview.delete({
      review_id: reviewId,
    });
    return review_data;
  } catch (error) {
    throw new Error("Failed To Delete");
  }
};
