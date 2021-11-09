/** @format */

import { ILike } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Cycles } from "../../Entities/Cycles";
import { User } from "../../Entities/User";

export const createCycleUtil = async ({
  Name,
  Photos,
  Price,
  Specifications,
  userId,
}: any) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    return Cycles.create({
      cycle_id: uuidv4(),
      Name: Name,
      owner: user,
      Price: Price,
      Specifications: Specifications,
      Photos: Photos,
    }).save();
  } catch (error) {
    console.log(error);
    throw new Error("A Cycle could not be creared");
  }
};

export const getCycleDetails = async (id: string) => {
  try {
    const cycle = await Cycles.findOne({
      relations: ["owner"],
      where: {
        cycle_id: id,
      },
    });
    return cycle;
  } catch (error) {
    console.log(error);
    throw new Error("No Cycle Exists!!!");
  }
};

export const getMyCyclesUtil = async (userId: string) => {
  try {
    const cycle = await Cycles.findOne({
      relations: ["owner"],
      where: {
        owner: userId,
      },
    });
    return cycle;
  } catch (error) {
    console.log(error);
    throw new Error("No Cycle Exists!!!");
  }
};

export const updateCycleDetailsUtil = async (info: any) => {
  try {
    const cycle: any = await Cycles.findOne({
      relations: ["owner"],
      where: {
        cycle_id: info.cycleId,
      },
    });
    // console.log(info);
    if (info.userId !== cycle.owner.id) {
      throw new Error("It failed while updating");
    }
    Object.keys(info).map((element: any, index: number) => {
      if (index > 1 && info[element]) {
        cycle[element] = info[element];
      }
    });
    return cycle.save();
  } catch (error) {
    throw new Error("Failed to Update");
  }
};

export const deleteCycleUtil = async (info: any) => {
  try {
    const cycle: Cycles | undefined = await Cycles.findOne({
      relations: ["owner"],
      where: {
        cycle_id: info.cycleId,
      },
    });
    if (cycle === undefined) {
      throw new Error("No cycle found");
    }
    // console.log(info);
    if (info.userId !== cycle.owner.id) {
      throw new Error("It failed while updating");
    }
    await Cycles.delete({
      cycle_id: info.cycleId,
    });
    return cycle;
  } catch (error) {
    throw new Error("Error Occured while Deleting a User");
  }
};

export const searchCycleUtil = async (name: string) => {
  try {
    const data = await Cycles.find({
      relations: ["owner"],
      where: {
        Name: ILike(`%${name}%`),
      },
      order: {
        createdAt: "DESC",
      },
    });
    return data;
  } catch (error) {
    throw new Error("Could not fetch Data");
  }
};
