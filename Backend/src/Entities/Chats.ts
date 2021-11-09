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
export class Chats extends BaseEntity {
  @Field()
  @Column({ unique: true })
  @PrimaryColumn()
  chatId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ referencedColumnName: "id", name: "sender_id" })
  sender: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ referencedColumnName: "id", name: "receiver_id" })
  receiver: User;

  @Field()
  @Column({ type: "text" })
  chat_message: String;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
