import { config } from 'dotenv'

config()

const {
  NODE_ENV,
  NODE_PORT,
  DB_MONGO_USERNAME,
  DB_MONGO_PASSWORD,
  DB_MONGO_NAME,
  DB_MONGO_NAME_TEST,
  BCRYPT_PAPPER_PASSWORD,
  BCRYPT_SALT_ROUNDS,
  JWT_SECRET,
} = process.env

export default {
  appMode: NODE_ENV,
  port: parseInt(NODE_PORT as string),
  dbUserName: DB_MONGO_USERNAME,
  dbPassword: DB_MONGO_PASSWORD,
  dbName: NODE_ENV == 'dev' ? DB_MONGO_NAME : DB_MONGO_NAME_TEST,
  bcryptPepper: BCRYPT_PAPPER_PASSWORD,
  bcryptSalt: BCRYPT_SALT_ROUNDS,
  jwtTokenSecret: JWT_SECRET,
}
