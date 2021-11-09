/** @format */

import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @Column({ unique: true })
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  Name: string;

  @Field()
  @Column({ unique: true })
  Email: string;

  @Column()
  Password: string;

  @Field()
  @Column({ unique: true })
  PhoneNumber: string;

  @Field()
  @Column({ length: 1000 })
  Address: String;

  // @OneToMany(() => Ride, (ride) => ride.rider, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  //   primary: true,
  // })
  // @JoinColumn({ referencedColumnName: "ride_id" })
  // ride: Ride[];

  // @OneToMany(() => Cycles, (cycles) => cycles.owner, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  //   primary: true,
  // })
  // @JoinColumn({ referencedColumnName: "cycle_id" })
  // cycles: Cycles[];

  // @OneToMany(() => UserReview, (UserReview) => UserReview.saidBy, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  //   primary: true,
  // })
  // @JoinColumn({ referencedColumnName: "review_id" })
  // reviews_byme: UserReview[];

  // @OneToMany(() => UserReview, (UserReview) => UserReview.refersTo, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  //   primary: true,
  // })
  // @JoinColumn({ referencedColumnName: "review_id" })
  // reviews_received: UserReview[];

  // @OneToMany(() => CycleReview, (cycleReview) => cycleReview.reviewer, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  //   primary: true,
  // })
  // @JoinColumn({ name: "review_id" })
  // cyclesReview: CycleReview[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
