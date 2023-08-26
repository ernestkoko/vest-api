import { DataSource } from "typeorm";

const AppDatasource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/dd/migrations/*.js'],
});
async function connectDB():Promise<void>{
    try {
        await AppDatasource.initialize();
        console.log("DATABASE CONNECTIOMN success")
    }catch(e){
        console.log("DATABASE  CONNECTIOMN ERROR")
    }
    
}
export {AppDatasource as AppDatasoruce, connectDB};