/** @format */

import { Chats } from "../Entities/Chats";
import { Ride } from "../Entities/Ride";


export interface ChatNotificationPayload {
  data: Chats[];
  message: string;
  error: string | null;
  userId: string;
}

export interface RidetNotificationPayload {
  data: Ride[];
  message: string;
  error: string | null;
  userId: string;
}

export const CHATNOTIFICATIONS = "CHATNOTIFICATIONS";
export const UPDATEMESSAGES = "UPDATEMESSAGES";
export const DELETEMESSAGES = "DELETEMESSAGES";

export const RIDEINITIATED = "RIDEINITIATED";
export const UPDATERIDESTATUS = "UPDATERIDESTATUS";
