/** @format */

import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ride } from "./Ride";
import { User } from "./User";

@Entity()
@ObjectType()
export class Cycles extends BaseEntity {
  @Field()
  @PrimaryColumn()
  cycle_id: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ referencedColumnName: "id", name: "owner_id" })
  owner: User;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  currentlyInUse: boolean;

  // @Field(() => [CycleReview], { nullable: true })
  // @OneToMany(() => CycleReview, (CycleReview) => CycleReview.cycle, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  //   primary: true,
  // })
  // @JoinColumn({ referencedColumnName: "review_id" })
  // reviews: CycleReview[];

  @Field()
  @Column()
  Name: string;

  @Field()
  @Column({ type: "float" })
  Price: number;

  @Field(() => [String])
  @Column({ type: "simple-array" })
  Specifications: string[];

  @Field(() => [String])
  @Column({ type: "simple-array" })
  Photos: string[];

  // @Field(() => [Ride])
  @OneToMany(() => Ride, (ride) => ride.cycle, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    primary: true,
  })
  Ride: Ride[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
