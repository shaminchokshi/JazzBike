/** @format */

import { IsEmail, IsString, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  Name: string;

  @Field()
  @IsEmail()
  Email: string;

  @Field()
  PhoneNumber: string;

  @Field()
  @IsString()
  @Length(8, 16)
  Password: string;

  @Field()
  @IsString()
  Address: string;
}

@InputType()
export class updateUserInput {
  @Field({ nullable: true })
  @IsString()
  Name: string;

  @Field({ nullable: true })
  @IsEmail()
  Email: string;

  @Field({ nullable: true })
  PhoneNumber: string;

  @Field({ nullable: true })
  @IsString()
  @Length(8, 16)
  Password: string;

  @Field({ nullable: true })
  @IsString()
  Address: string;
}

@InputType()
export class searchUsersInput {
  @Field()
  name: string;

  @Field()
  pageNo: number;

  @Field()
  limit: number;
}
