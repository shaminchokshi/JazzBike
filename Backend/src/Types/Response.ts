/** @format */

import { User } from "../Entities/User";
import { Field, ObjectType } from "type-graphql";
import { UserReview } from "../Entities/User_Review";
import { CycleReview } from "../Entities/Cycle_Review";
import { Cycles } from "../Entities/Cycles";
import { Ride } from "../Entities/Ride";
import { Chats } from "../Entities/Chats";

@ObjectType()
export class ResponseObject {
  @Field(() => [User], { nullable: true })
  data: User[] | null | String;

  @Field()
  message: string;

  @Field(() => String, { nullable: true })
  error: string | null;
}

@ObjectType()
export class UserReviewResponse {
  @Field(() => [UserReview], { nullable: true })
  data: UserReview[] | null | String;

  @Field()
  message: string;

  @Field(() => String, { nullable: true })
  error: string | null;
}

@ObjectType()
export class CycleResponse {
  @Field(() => [Cycles], { nullable: true })
  data: Cycles[] | null | String;

  @Field()
  message: string;

  @Field(() => String, { nullable: true })
  error: string | null;
}

@ObjectType()
export class CycleReviewResponse {
  @Field(() => [CycleReview], { nullable: true })
  data: CycleReview[] | null | String;

  @Field()
  message: string;

  @Field(() => String, { nullable: true })
  error: string | null;
}

@ObjectType()
export class RideResponse {
  @Field(() => [Ride], { nullable: true })
  data: Ride[] | null | String;

  @Field()
  message: string;

  @Field({ defaultValue: null, nullable: true })
  status: string;

  @Field(() => String, { nullable: true })
  error: string | null;
}
@ObjectType()
export class ChatResponse {
  @Field(() => [Chats], { nullable: true })
  data: Chats[] | null | String;

  @Field()
  message: string;

  @Field(() => String, { nullable: true })
  error: string | null;
}

@ObjectType()
export class ProfitResponse {
  @Field(() => [Number])
  Profit: Number[];

  @Field(() => [Cycles], { nullable: true })
  Cycles: Cycles[];

  @Field()
  message: string;

  @Field(() => String, { nullable: true })
  error: string | null;
}
