import { Connection, createConnection } from 'typeorm';
import { User } from '../src/auth/entities/user.entity';

export const clearDB = async (connection: Connection | void) => {
  if (connection) {
    await connection.dropDatabase();
    await connection.synchronize();
  }
};

export const _getConnection = async () => {
  return await createConnection({
    name: 'default2',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT_TEST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    entities: [User],
  });
};
