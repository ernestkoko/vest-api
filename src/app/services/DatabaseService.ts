import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import dataSource, { datasourceOptions } from "../database/data-source";
import EventEmitter from "events";
import { BaseEntity } from "../models/entities/base-entity";
import { User } from "../models/entities/user.entity";

class DatabaseService{
public static Emitter: EventEmitter = new EventEmitter();
    private static dataSource?: DataSource;
    public static getDataSource<T extends BaseEntity>(t: EntityTarget<T>): Repository<T>{
        const repository = DatabaseService.dataSource?.getRepository(t);
        if(!repository) throw new Error("repository error")
        return repository!;
    }
    public static async getConnection(){
        DatabaseService.registerEvent();
        DatabaseService.registerSuccessEvent()
        await DatabaseService.createConnection();

    }
    static async registerEvent() {
        // DatabaseService.Emitter.on('BD_CONNECTION_ERROR', async ()=>{
        //     console.log("Database connection error... retrying..")
        //     //set time out and retry
        //     setTimeout(async ()=>{
        //         await DatabaseService.createConnection(); 
        //     }, 3000)
        // })
    }

    static async registerSuccessEvent() {
        DatabaseService.Emitter.on('BD_CONNECTION_SUCCESS', ()=>{
            console.log("Database connection SUCCESSFUL")
           
        })
    }

    private static async createConnection(){
        
        // const dataSource = new DataSource({
        //     type: 'mysql',
        //     host: process.env.DATABASE_HOST,
        //     port: 3306,
        //     username: process.env.DATABASE_USERNAME,
        //     password: process.env.DATABASE_PASSWORD,
        //     database: process.env.DATABASE_NAME,
        //     synchronize: true,
        //     entities: ['dist/**/*.entity.js'],
        //     migrations: ['dist/dd/migrations/*.js'],
        // });
        try {
            const source = await dataSource.initialize();
            console.log("DB connected")
            DatabaseService.dataSource = source;
        }catch(e: any){
            console.log("DB connected failed... emiting event..");
            console.log({ERROR: e})
            DatabaseService.Emitter.emit('BD_CONNECTION_ERROR')
        }
   

    }
}
export { DatabaseService };