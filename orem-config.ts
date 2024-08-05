import { DataSourceOptions } from 'typeorm';

export const configSQLite: DataSourceOptions = {
    type: 'sqlite',
    database: './db.sql',
    synchronize: true,
    entities: [`${__dirname}/**/*.model{.ts,.js}`],
};

export const configMySQL: DataSourceOptions ={
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bulir_one',
      entities: [`${__dirname}/**/*.model{.ts,.js}`],
      synchronize: false,
}

export default configMySQL;