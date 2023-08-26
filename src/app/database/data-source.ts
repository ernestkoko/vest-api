import { DataSourceOptions, DataSource } from "typeorm";
export const  datasourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3030,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/dd/migrations/*.js'],
  }

const  dataSource = new DataSource(datasourceOptions);
export default dataSource;