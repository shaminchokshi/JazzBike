/** @format */

import { Field, InputType } from "type-graphql";

@InputType()
export class sendMessageInput {
  @Field()
  sendingTo: String;

  @Field()
  message: String;
}

@InputType()
export class updateMessageInput {
  @Field()
  chat_id: string;

  @Field()
  message: string;
}

@InputType()
export class findMyMessageInput {
  @Field()
  id: string;

  @Field()
  pageNo: number;

  @Field()
  limit: number;
}
