import { Field, InputType } from "type-graphql";

@InputType()
export class findRidesDoneInput{
    @Field()
    cycle_id: string
    
    @Field()
    pageNo: Number
    
    @Field()
    limit: Number
}

@InputType()
export class ridesTakenInput {
  @Field()
  pageNo: Number;

  @Field()
  limit: Number;
}

