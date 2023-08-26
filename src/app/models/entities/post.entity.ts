import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entity";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";

@Entity('post')
export class Post extends BaseEntity{

    @Column({
        nullable: false
    })
    public message!: string;

    @ManyToOne(()=> User,(user)=> user.posts,{
        onDelete: 'CASCADE'
    })
    user!: User;

    @OneToMany(()=> Comment,(comment)=> comment.post,{
        onDelete:'SET NULL'
    })
    comments!: [];

}