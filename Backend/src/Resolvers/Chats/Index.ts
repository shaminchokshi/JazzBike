/** @format */

import { isAuth } from "../../Middlewares/isAuth";
import { PubSubEngine } from "graphql-subscriptions";
import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import {
  findMyMessageInput,
  sendMessageInput,
  updateMessageInput,
} from "./Input";
import {
  createMessageUtil,
  deleteMessageUtil,
  getMyMessages,
  getReceipientsUtil,
  updateMessageUtil,
} from "./Utils";
import { MyContext } from "../../Types/Context";
import { ChatResponse, ResponseObject } from "../../Types/Response";
import {
  ChatNotificationPayload,
  CHATNOTIFICATIONS,
  UPDATEMESSAGES,
  DELETEMESSAGES,
} from "../../Types/Subscriptions";

@Resolver()
export class ChatResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => ChatResponse)
  async sendMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg("data") { message, sendingTo }: sendMessageInput,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data = await createMessageUtil({
        userId: ctx.req.session.userId,
        message,
        sendingTo,
      });
      const response: ChatNotificationPayload = {
        data: [data],
        message: "Fetch Successfull",
        error: null,
        userId: ctx.req.session.userId,
      };
      await pubSub.publish(CHATNOTIFICATIONS, response);
      return response;
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessfull",
        error: `Error : ${error.message}`,
      };
    }
  }

  @Subscription(() => ChatResponse, {
    topics: CHATNOTIFICATIONS,
    filter: ({ args, payload }) => {
      return args.userId === payload.data[0].receiver.id;
    },
  })
  textSubscription(
    @Arg("userId") _userId: string,
    @Root() { data, error, message }: ChatNotificationPayload
  ) {
    return {
      data: data,
      message: message,
      error: error,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => ChatResponse)
  async updateMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg("data") { chat_id, message }: updateMessageInput,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data = await updateMessageUtil({
        userId: ctx.req.session.userId,
        chat_id,
        message,
      });
      const response: ChatNotificationPayload = {
        data: [data],
        message: "Fetch Successfull",
        error: null,
        userId: ctx.req.session.userId,
      };
      await pubSub.publish(UPDATEMESSAGES, response);
      return response;
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessfull",
        error: `Error : ${error.message}`,
      };
    }
  }

  @Subscription(() => ChatResponse, {
    topics: UPDATEMESSAGES,
    filter: ({ args, payload }) => {
      return (
        args.userId === payload.data[0].receiver.id ||
        args.userId === payload.data[0].sender.id
      );
    },
  })
  updateSubscription(
    @Arg("userId") _userId: string,
    @Root() { data, error, message }: ChatNotificationPayload
  ) {
    return {
      data: data,
      message: message,
      error: error,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => ChatResponse)
  async deleteMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg("chat_id") chat_id: string,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data = await deleteMessageUtil({
        userId: ctx.req.session.userId,
        chat_id,
      });
      const response: ChatNotificationPayload = {
        data: [data],
        message: "Fetch Successfull",
        error: null,
        userId: ctx.req.session.userId,
      };
      await pubSub.publish(DELETEMESSAGES, response);
      return response;
    } catch (error) {
      return {
        data: null,
        message: "Fetch Unsuccessfull",
        error: `Error : ${error.message}`,
      };
    }
  }

  @Subscription(() => ChatResponse, {
    topics: DELETEMESSAGES,
    filter: ({ args, payload }) => {
      return (
        args.userId === payload.data[0].receiver.id ||
        args.userId === payload.data[0].sender.id
      );
    },
  })
  deleteSubscription(
    @Arg("userId") _userId: string,
    @Root() { data, error, message }: ChatNotificationPayload
  ) {
    return {
      data: data,
      message: message,
      error: error,
    };
  }

  @UseMiddleware(isAuth)
  @Query(() => ChatResponse)
  async findMyMessages(
    @Arg("data") { id, limit, pageNo }: findMyMessageInput,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data = await getMyMessages({
        userId: ctx.req.session.userId,
        id,
        limit,
        pageNo,
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
  @UseMiddleware(isAuth)
  @Query(() => ResponseObject)
  async getReceipients(@Ctx() ctx: MyContext) {
    try {
      const data = await getReceipientsUtil({ userId: ctx.req.session.userId });
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
