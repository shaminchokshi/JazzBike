/** @format */

import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class UserReview extends BaseEntity {
  @Field()
  @Column({ unique: true })
  @PrimaryColumn()
  review_id: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ referencedColumnName: "id", name: "saidBy_id" })
  saidBy: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ referencedColumnName: "id", name: "refersTo_id" })
  refersTo: User;

  @Field()
  @Column({ type: "varchar" })
  data: string;

  @Field()
  @Column({ type: "float" })
  stars: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
