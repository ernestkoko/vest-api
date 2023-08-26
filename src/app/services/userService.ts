import { IUserRepository } from "./UserRepository";
import { User } from "../models/entities/user.entity";
import { Repository, DataSource  } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUser } from '../models/User';
import { DatabaseService } from "./DatabaseService";
import { AppDatasoruce } from "./source";
import { BadRequestException } from "../../lib/custom-errors";
import { Post } from "../models/entities/post.entity";
import { Comment } from "../models/entities/comment.entity";

export class UserService  {
    private readonly userRepository: Repository<User> =  AppDatasoruce.manager.getRepository(User);
    private readonly postRepository: Repository<Post> =  AppDatasoruce.manager.getRepository(Post);

    
    async get(): Promise<User[] | null> {
        // Get users from database
        try {
            const users = await this.userRepository.find();
            return users;
        }
        catch (error) {
            return null
        }
    }
    async getTopThreeUsersPostAndLatestComment(){
        const query = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect("user.posts",'post')
            .leftJoin(
                (subquery) =>
                  subquery
                    .select('comment.userId, MAX(comment.createdAt) as latestCommentDate')
                    .from('comment', 'comment')
                    .groupBy('comment.userId'),
                'latestComments',
                'latestComments.userId = user.id'
            )
            
            // .orderBy('postCount', 'DESC')
            .limit(3);
        return await query.getMany();
    }
    async getById(id: number): Promise<User | null> {

        try {
            const user = await this.userRepository.findOneOrFail({
                where:{
                    id
                }
            });
            return user;
        } catch (error) {
            return null;
        }
    }
    async createUser(model: IUser): Promise<User | null> {
        const { username,  password, email } = model;
        const user = new User();
        user.username = username.trim();
        user.password = await bcrypt.hash(password, 6);
        user.email = email
        //Check if the user with the email already exists
        const userExists = await this.userRepository.findOne({
            where:{
                email: email
            }
        });
        if(userExists) throw new BadRequestException("user already exists");;
        const savedUser = await this.userRepository.save(user);
        if(savedUser.password) delete savedUser.password;
        return savedUser;
        
    }

    async createPost(userId: number, post: Post ):Promise<Post>{
        const user = await this.userRepository.findOne({
            where:{
                id: userId
            }
        });
        if(!user) throw new BadRequestException('User not found');
        post.user = user;

        const savedPost = await this.postRepository.save(post);
        return savedPost;

    }

    async getPosts(userId: number): Promise<Post[]>{
        const post = await this.postRepository.find({
            where:{
                user:{
                    id: userId
                }
            }
        });
        if(!post) throw new BadRequestException('Post not found!');
        return post;
    }

   
    async delete(id: number): Promise<User | null> {
        let user: User;
        try {
            user = await this.userRepository.findOneOrFail({
                where:{
                    id
                }
            });
            if (user) {
                this.userRepository.delete(id);
            }
            return null;
        } catch (error) {
            return null;
        }
    }

}