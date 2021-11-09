/** @format */

import { Field, InputType } from "type-graphql";

@InputType()
export class createCycleReviewInput {
  @Field()
  cycleId: string;

  @Field()
  data: string;
}

@InputType()
export class getCycleReviewsInput{
  @Field()
  cycleId:string
 
  @Field()
  limit:number
 
  @Field()
  pageNo:number
}