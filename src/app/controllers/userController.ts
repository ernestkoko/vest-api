// 
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/userService';
import Template from '../global/response';
import { BadRequestException, ServerException } from '../../lib/custom-errors';
import { APIError } from '../global/response/apierror';
import { validationResult } from 'express-validator';
import { IUser } from '../models/User';
import { Post } from '../models/entities/post.entity';
export class UserController {
  private static readonly userService: UserService = new UserService();
  
  public static login = async (req: Request, res: Response, next: NextFunction) =>{
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const email: string = req.body.email;
      const password: string = req.body.password;
      const data = await this.userService.login({email, password});
      return res.send(data);
    }catch(e){
      next(e)
    }
  }
  public static listAll = async (req: Request, res: Response, next: NextFunction) =>  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const data = await this.userService.get();
      return res.send({data})
    }catch(e){
      console.log({ERROR: e})
      next(e);
    }
  }
  public static createUser = async (req: Request, res: Response, next: NextFunction) =>{
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = req.body as IUser;
      const data = await this.userService.createUser(user);
      return res.send(data);

    }catch(e){
      next(e)
    }
  }

  public static createPost = async (req: Request, res: Response, next: NextFunction)=>{
    try {
      //@ts-ignore
      
      const id = req.params.id
      if(!id){
        throw new BadRequestException('id must be set');
      }
      if(typeof parseInt(id) != 'number' ){
        throw new BadRequestException('id must be a number');
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = parseInt(id, 10);
      
      const post = req.body as Post;
      //@ts-ignore
      const authUser: AuthUser = req.token;
      const data = await this.userService.createPost(userId, post, authUser)
      return res.send(data);
    }catch(e){
      next(e);
    }
  }

  public static getPost = async (req: Request, res: Response, next: NextFunction)=>{
    try {
      const id = req.params.id
      if(!id){
        throw new BadRequestException('id must be set');
      }
      if(typeof parseInt(id) != 'number' ){
        throw new BadRequestException('id must be a number');
      }
      const data = await this.userService.getPosts(parseInt(id));
      return res.send(data);
    }catch(e){
      next(e);
    }
  }

  public static getTopThreeUsersPostAndLatestComment = async (req: Request, res: Response, next: NextFunction) =>{
    try {
      const data = await this.userService.getTopThreeUsersPostAndLatestComment();
      return res.send(data);

    }catch(e){
      console.log({"FETCH 3 error: ": e})
      next(e);
    }
  }
}