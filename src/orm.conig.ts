import 'reflect-metadata';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host:
    'postgres://nhazhwzkqxrywo:c1808c8b3a6318c1205e439bcac46c67485212e8a3496865ea2626edca4fe17b@ec2-54-216-48-43.eu-west-1.compute.amazonaws.com:5432/d24ht6p131niui',
  port: 5432,
  username: 'nhazhwzkqxrywo',
  password: 'c1808c8b3a6318c1205e439bcac46c67485212e8a3496865ea2626edca4fe17b',
  database: 'd24ht6p131niui',
  logging: true,
  entities: [path.resolve(__dirname, '**/*.entity{.ts,.js}')],
  synchronize: false,
};
