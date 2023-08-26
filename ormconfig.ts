module.exports ={
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'vest',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/dd/migrations/*.js'],
}