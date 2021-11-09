/** @format */

import { Field, InputType } from "type-graphql";

@InputType()
export class createCycleInput {
  @Field()
  Name: string;

  @Field()
  Price: number;

  @Field(() => [String])
  Specifications: [string];

  @Field(() => [String])
  Photos: [string];
}

@InputType()
export class updateCycleDetails {
  @Field({nullable:false})
  cycleId:string
    
  @Field({ nullable: true })
  Name: string;

  @Field({ nullable: true })
  Price: number;

  @Field(() => [String], { nullable: true })
  Specifications: [string];

  @Field(() => [String], { nullable: true })
  Photos: [string];
}


