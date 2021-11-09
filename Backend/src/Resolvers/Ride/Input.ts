/** @format */

import { Field, InputType } from "type-graphql";

@InputType()
export class changeStatusInput {
  @Field({ nullable: true })
  x_coordinate: number;

  @Field({ nullable: true })
  y_coordinate: number;

  @Field()
  ride_id: string;

  @Field()
  status: string;
}

@InputType()
export class changeCoordinatesInput {
  @Field()
  ride_id: string;

  @Field()
  x_coordinate: number;

  @Field()
  y_coordinate: number;
}
