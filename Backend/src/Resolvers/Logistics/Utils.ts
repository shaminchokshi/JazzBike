/** @format */

import { Cycles } from "../../Entities/Cycles";
import { Ride } from "../../Entities/Ride";

export const profits = async ({ user_id }: any) => {
  try {
    const data: Cycles[] = await Cycles.find({
      relations: ["Ride"],
      where: {
        owner: user_id,
      },
    });
    if (data === undefined) {
      throw new Error();
    }
    var profit: any[] = [];
    data.map((element: Cycles) => {
      var sum = 0;
      element.Ride.map((ride) => {
        sum = sum + ride.cost;
      });
      profit.push(sum);
    });
    return {
      data,
      profit,
    };
  } catch (error) {
    throw new Error("Sorry No Data");
  }
};

export const ridesDone = async ({ cycle_id, limit, pageNo }: any) => {
  try {
    var skip = (pageNo - 1) * limit;
    const data = await Ride.find({
      where: {
        cycle: cycle_id,
      },
      take: limit,
      skip: skip,
      order: {
        createdAt: "DESC",
      },
    });
    return data;
  } catch (error) {
    throw new Error("No Data Found");
  }
};

export const getRidesTakenUtil = async ({ userId, limit, pageNo }: any) => {
  try {
    var skip = (pageNo - 1) * limit;
    const data = await Ride.find({
      where: {
        rider: userId,
      },
      take: limit,
      skip: skip,
      order: {
        createdAt: "DESC",
      },
    });
    return data;
  } catch (error) {
    throw new Error("Cant find data");
  }
};
