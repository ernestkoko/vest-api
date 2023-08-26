import * as bcrypt from 'bcrypt';
import { IsNotEmpty, Length } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity("user")
export class User extends BaseEntity {

  @Column()
  public username!: string;

  @Column({
    unique: true
  })
  public email!: string;

  @Column({
    select: false,
    nullable: false
  })
  public password?: string;

  @OneToMany(()=> Post, (post)=>post.user,{
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  posts!: Post[];

  @OneToMany(()=>Comment, (comment)=>comment.user,{
    onDelete: 'SET NULL'
  })
  comments!: Comment[];

  // public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
  //   return bcrypt.compareSync(unencryptedPassword, this.password);
  // }
}