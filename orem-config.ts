import { DataSourceOptions } from 'typeorm';

export const configSQLite: DataSourceOptions = {
    type: 'sqlite',
    database: './db.sql',
    synchronize: true,
    entities: [`${__dirname}/**/*.model{.ts,.js}`],
};

export const configMySQL: DataSourceOptions = {
    type: 'mysql',
    host: 'mysql.railway.internal',
    port: 3306,
    username: 'root',
    password: 'ZRqstrOtIohoWoKuBvcHwcWAZkcEEGam',
    database: 'railway',
    entities: [`${__dirname}/**/*.model{.ts,.js}`],
    synchronize: false,
}