import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base-entity";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity('comment')
export class Comment extends BaseEntity{

    @Column({
        nullable: false
    })
    message!: string;

    @ManyToOne(()=> User, (user)=> user.comments,{
        onDelete: 'CASCADE'
    })
    user!: User;

    @ManyToOne(()=> Post,(post)=> post.comments,{
        onDelete: 'CASCADE'
    })
    post!: Post;
}