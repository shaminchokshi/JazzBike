/** @format */

import { Chats } from "../../Entities/Chats";
import { User } from "../../Entities/User";
import { v4 as uuidv4 } from "uuid";

export const createMessageUtil = async ({
  userId,
  sendingTo,
  message,
}: any) => {
  try {
    // console.log(userId, sendingTo, message);
    const receiver = await User.findOne({
      id: sendingTo,
    });
    const sender = await User.findOne({
      id: userId,
    });
    return Chats.create({
      chatId: uuidv4(),
      sender: sender,
      receiver: receiver,
      chat_message: message,
    }).save();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMyMessages = async ({ userId, id, limit, pageNo }: any) => {
  try {
     var skip = (pageNo - 1) * limit;
    const data = await Chats.find({
      relations: ["sender", "receiver"],
      where: [
        { sender: userId, receiver: id },
        { sender: id, receiver: userId },
      ],
      take: limit,
      skip: skip,
      order: {
        createdAt: "DESC",
      },
    });
    return data;
  } catch (error) {
    throw new Error("Could not get Messages");
  }
};

// cache this on redis
export const getReceipientsUtil = async ({ userId }: any) => {
  try {
    const unique: any = {};
    const data = await Chats.find({
      // relations: ["sender", "receiver"],
      where: [{ sender: userId }, { receiver: userId }],
      order: {
        createdAt: "DESC",
      },
    });
    data.map((element: any) => {
      if (
        unique[element.sender.id] === undefined &&
        element.sender.id !== userId
      ) {
        unique[element.sender.id] = element.sender;
      }
      if (
        unique[element.receiver.id] === undefined &&
        element.receiver.id !== userId
      ) {
        unique[element.receiver.id] = element.receiver;
      }
    });
    return Object.values(unique);
  } catch (error) {
    console.log(error);
    throw new Error("Some Error Occured in reading Receipients ");
  }
};

export const updateMessageUtil = async ({ userId, chat_id, message }: any) => {
  try {
    const data = await Chats.findOne({
      relations: ["sender", "receiver"],
      where: {
        chatId: chat_id,
      },
    });
    if (data === undefined) {
      throw new Error("Cannot Update it");
    }

    if (data?.sender.id !== userId) {
      throw new Error("Cannot Update it");
    }
    data["chat_message"] = message;
    return data.save();
  } catch (error) {
    throw new Error("Cannot Update it");
  }
};

export const deleteMessageUtil = async ({ userId, chat_id }: any) => {
  try {
    const data = await Chats.findOne({
      relations: ["sender"],
      where: {
        chatId: chat_id,
      },
    });
    if (data === undefined) {
      throw new Error("Cannot Delete it");
    }

    if (data?.sender.id !== userId) {
      throw new Error("Cannot Update it");
    }
    await Chats.delete({
      chatId: chat_id,
    });
    return data
  } catch (error) {
    throw new Error("Cannot Update it");
  }
};
