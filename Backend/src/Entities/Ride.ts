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
import { Cycles } from "./Cycles";
import { User } from "./User";

@ObjectType()
class Coordinates {
  @Field()
  x_coordinate: string;

  @Field()
  y_coordinate: string;
}

@Entity()
@ObjectType()
export class Ride extends BaseEntity {
  @Field()
  @Column()
  @PrimaryColumn()
  ride_id: string;

  @Field(() => Cycles)
  @ManyToOne(() => Cycles, (cycle) => cycle.Ride, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ referencedColumnName: "cycle_id", name: "cycle_id" })
  cycle: Cycles;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id, { eager: true, nullable: false })
  @JoinColumn({ referencedColumnName: "id", name: "rider_id" })
  rider: User;

  @Field(() => Coordinates, { nullable: true })
  @Column({ type: "simple-json", nullable: true })
  location: Coordinates;

  @Field()
  @Column({ default: "Waiting" })
  status: String; //Waiting Accepted Rejected Completed Cancelled

  @Field(() => Date, { nullable: true })
  @Column({ type: "timestamp", nullable: true })
  starting_time: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: "timestamp", nullable: true })
  ending_time: Date;

  @Field(() => Number, { nullable: true })
  @Column({ type: "float", nullable: true })
  cost: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
