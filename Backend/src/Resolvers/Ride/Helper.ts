/** @format */
import { Ride } from "../../Entities/Ride";
// import { Cycles } from "../../Entities/Cycles";

//These 2 only cycle owner can do it
export const rideAccepted = async ({ ride_id, userId }: any) => {
  try {
    const ride = await Ride.findOne({
      where: {
        ride_id: ride_id,
      },
    });
    if (ride === undefined) {
      throw new Error("Ride Not Found");
    }
    if (ride.cycle.owner.id !== userId) {
      throw new Error("You Dont have Access to Change it ");
    }
    const cycle = ride.cycle;
    cycle.currentlyInUse = true;
    await cycle.save();
    ride["status"] = "Accepted";
    return ride.save();
  } catch (error) {``
    throw new Error(error.message);
  }
};

export const rideRejected = async ({ ride_id, userId }: any) => {
  try {
    const ride = await Ride.findOne({
      where: {
        ride_id: ride_id,
      },
    });
    if (ride === undefined) {
      throw new Error("Ride Not Found");
    }
    if (ride.cycle.owner.id !== userId) {
      throw new Error("You Dont have Access to Change it ");
    }
    ride["status"] = "Rejected";
    return ride.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Only Rider Can do it

export const rideStarted = async ({
  ride_id,
  x_coordinate,
  y_coordinate,
  userId,
}: any) => {
  const location = {
    x_coordinate: x_coordinate,
    y_coordinate: y_coordinate,
  };
  const ride = await Ride.findOne({
    where: {
      ride_id: ride_id,
    },
  });
  if (ride === undefined) {
    throw new Error("Ride Not Found");
  }
  if (ride.rider.id !== userId) {
    throw new Error("You Dont have Access to Change it ");
  }

  ride["status"] = "Started";
  ride["starting_time"] = new Date();
  ride["location"] = location;
  return ride.save();
};

export const rideCompleted = async ({
  ride_id,
  x_coordinate,
  y_coordinate,
  userId,
}: any) => {
  try {
    const location = {
      x_coordinate: x_coordinate,
      y_coordinate: y_coordinate,
    };
    const ride = await Ride.findOne({
      where: {
        ride_id: ride_id,
      },
    });
    if (ride === undefined) {
      throw new Error("Ride Not Found");
    }
    if (ride.rider.id !== userId) {
      throw new Error("You Dont have Access to Change it ");
    }
     const cycle = ride.cycle;
     cycle.currentlyInUse = false;
     await cycle.save();
    ride["location"] = location;
    ride["status"] = "Completed";
    ride["ending_time"] = new Date();
    const time_elapsed = diff_minutes(ride.starting_time, ride.ending_time);
    const cost = time_elapsed * ride.cycle.Price;
    ride["cost"] = cost;
    return ride.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const rideCanceled = async ({ ride_id, userId }: any) => {
  try {
    const ride = await Ride.findOne({
      where: {
        ride_id: ride_id,
      },
    });
    if (ride === undefined) {
      throw new Error("Ride Not Found");
    }
    if (ride.rider.id !== userId) {
      throw new Error("You Dont have Access to Change it ");
    }
    ride["status"] = "Cancelled";
  } catch (error) {}
};

function diff_minutes(dt2: any, dt1: any) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}
