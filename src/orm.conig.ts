import 'reflect-metadata';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'aliaksandr',
  password: 'root',
  database: 'forum_db',
  entities: [path.resolve(__dirname, '**/*.entity{.ts,.js}')],
  synchronize: true,
};
