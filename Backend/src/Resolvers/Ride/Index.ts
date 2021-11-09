/** @format */

import { isAuth } from "../../Middlewares/isAuth";
import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../../Types/Context";
import {
  changeCoordinatesUtil,
  changeStatusUtil,
  getRideDetailUtil,
  initiateRideUtil,
} from "./Utils";
import { RideResponse } from "../../Types/Response";
import { changeCoordinatesInput, changeStatusInput } from "./Input";
import {
  RIDEINITIATED,
  RidetNotificationPayload,
  UPDATERIDESTATUS,
} from "../../Types/Subscriptions";

@Resolver()
export class RideResolvers {
  @UseMiddleware(isAuth)
  @Mutation(() => RideResponse)
  async initiateRide(
    @PubSub() pubSub: PubSubEngine,
    @Arg("cycleId") cycleId: string,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data = await initiateRideUtil({
        cycleId: cycleId,
        userId: ctx.req.session.userId,
      });
      const response: RidetNotificationPayload = {
        data: [data],
        message: "Fetch Successful",
        error: null,
        userId: ctx.req.session.userId,
      };
      await pubSub.publish(RIDEINITIATED, response);
      return response;
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessful",
        error: `Error : ${error.message}`,
      };
    }
  }

  @Subscription(() => RideResponse, {
    topics: RIDEINITIATED,
    filter: ({ args, payload }) => {
      return args.userId === payload.data[0].cycle.owner.id;
    },
  })
  initiateRideSub(
    @Arg("userId") _userId: string,
    @Root() { data, error, message }: RidetNotificationPayload
  ) {
    return {
      data: data,
      message: message,
      error: error,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => RideResponse)
  async changeRideStatus(
    @PubSub() pubSub: PubSubEngine,
    @Arg("data")
    { ride_id, status, x_coordinate, y_coordinate }: changeStatusInput,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data: any = await changeStatusUtil({
        ride_id,
        status,
        x_coordinate,
        y_coordinate,
        userId: ctx.req.session.userId,
      });
      const response: RidetNotificationPayload = {
        data: [data],
        message: "Fetch Successful",
        error: null,
        userId: ctx.req.session.userId,
      };
      await pubSub.publish(UPDATERIDESTATUS, response);
      return response;
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessful",
        error: `Error : ${error.message}`,
      };
    }
  }

  @Subscription(() => RideResponse, {
    topics: UPDATERIDESTATUS,
    filter: ({ args, payload }) => {
      return (
        args.userId === payload.data[0].cycle.owner.id ||
        args.userId === payload.data[0].rider.id
      );
    },
  })
  rideStatusSubs(
    @Arg("userId") _userId: string,
    @Root() { data, error, message }: RidetNotificationPayload
  ) {
    return {
      data: data,
      message: message,
      error: error,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => RideResponse)
  async updateCoordinates(
    @Arg("data")
    { x_coordinate, y_coordinate, ride_id }: changeCoordinatesInput,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data = await changeCoordinatesUtil({
        ride_id,
        x_coordinate,
        y_coordinate,
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

  @UseMiddleware(isAuth)
  @Query(() => RideResponse)
  async getRideDetail(@Arg("rideId") rideId: string) {
    try {
      const data = await getRideDetailUtil(rideId);
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
