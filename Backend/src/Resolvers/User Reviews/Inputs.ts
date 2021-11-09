/** @format */

import { Field, InputType } from "type-graphql";

@InputType()
export class createReviewInput {
  @Field()
  refers_to: string;

  @Field()
  data: string;

  @Field()
  stars: number;
}

@InputType()
export class updateUserReviewInput {
  @Field()
  id: string;

  @Field()
  data: string;
}

@InputType()
export class deleteUserReviewInput {
  @Field()
  id: string;
}

@InputType()
export class getReviewsInput {
  @Field()
  userId: string;

  @Field()
  pageNo: number;

  @Field()
  limit: number;
}
