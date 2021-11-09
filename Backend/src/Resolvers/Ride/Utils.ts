/** @format */

import { Cycles } from "../../Entities/Cycles";
import { Ride } from "../../Entities/Ride";
import { User } from "../../Entities/User";
import { v4 as uuidv4 } from "uuid";
import {
  rideAccepted,
  rideCanceled,
  rideCompleted,
  rideRejected,
  rideStarted,
} from "./Helper";

const rideValidation = async ({ userId, cycleId }: any) => {
  try {
    const checkIfCycleIsAvailable: Cycles | undefined = await Cycles.findOne({
      where: {
        cycle_id: cycleId,
        currentlyInUse: true,
      },
    });
    if (checkIfCycleIsAvailable) {
      throw new Error("A ride already in Progress");
    }
    const checkIfRideAlreadygoing: Ride | undefined = await Ride.findOne({
      where: [
        {
          rider: userId,
          status: "Started",
        },
        {
          rider: userId,
          status: "Accepted",
        },
        {
          rider: userId,
          status: "Waiting",
        },
      ],
    });
    if (checkIfRideAlreadygoing) {
      throw new Error("A ride already in Progress");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const initiateRideUtil = async ({ cycleId, userId }: any) => {
  try {
    await rideValidation({ cycleId, userId });
    const user = await User.findOne({
      where: { id: userId },
    });
    const cycle = await Cycles.findOne({
      where: { cycle_id: cycleId },
    });
    return Ride.create({
      ride_id: uuidv4(),
      cycle: cycle,
      rider: user,
      status: "Waiting",
    }).save();
  } catch (error) {
    throw new Error("Ride Could not be initiaited");
  }
};

export const changeStatusUtil = async ({
  ride_id,
  status,
  x_coordinate,
  y_coordinate,
  userId,
}: any) => {
  try {
    switch (status) {
      case "Accepted":
        const acceptedData = await rideAccepted({
          ride_id,
          userId,
        });
        return acceptedData;
      case "Rejected":
        const rejectedData = await rideRejected({
          ride_id,
          userId,
        });
        return rejectedData;
      case "Started":
        if (x_coordinate === undefined || y_coordinate === undefined) {
          throw new Error("Coordinates are not Provided");
        }
        const startedData = await rideStarted({
          ride_id,
          userId,
          x_coordinate,
          y_coordinate,
        });
        return startedData;
      case "Completed":
        if (x_coordinate === undefined || y_coordinate === undefined) {
          throw new Error("Coordinates are not Provided");
        }
        const completedData = await rideCompleted({
          ride_id,
          userId,
          x_coordinate,
          y_coordinate,
        });
        return completedData;
      case "Cancelled":
        const canceledData = await rideCanceled({
          ride_id,
          userId,
        });
        return canceledData;
      default:
        throw new Error("Status is Incorrect");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeCoordinatesUtil = async ({
  x_coordinate,
  y_coordinate,
  ride_id,
  userId,
}: any) => {
  try {
    if (x_coordinate === undefined || y_coordinate === undefined) {
      throw new Error("Coordinates are not Provided");
    }
    const location = {
      x_coordinate: x_coordinate,
      y_coordinate: y_coordinate,
    };
    const ride = await Ride.findOne({
      where: {
        ride_id: ride_id,
      },
    });
    if (
      ride === undefined ||
      ride.status === "Accepted" ||
      ride.status === "Rejected" ||
      ride.status === "Waiting" ||
      ride.status === "Cancelled"
    ) {
      throw new Error(
        "Ride Not Found or you dont have permission for this mutation"
      );
    }
    if (ride.rider.id !== userId) {
      throw new Error("You Dont have Access to Change it ");
    }
    ride["location"] = location;
    return ride.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getRideDetailUtil = async (id: string) => {
  try {
    const data = await Ride.findOne({
      relations: ["cycle", "rider"],
      where: {
        ride_id: id,
      },
    });
    return data;
  } catch (error) {
    throw new Error("No Such Ride");
  }
};
