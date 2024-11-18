import config from '../config'
import mongoose from 'mongoose'
const mongoUrl: string = `mongodb+srv://${config.dbUserName}:${config.dbPassword}@cluster0.zr8ur.mongodb.net/${config.dbName}?retryWrites=true&w=majority&appName=Cluster0`
// const mongoConnectOptions: mongoose.ConnectOptions = {}

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(mongoUrl)
    // @TODO: only log when config.appMode == 'dev
    console.log(`connecting to mongodb successfully ${conn.now()}`)
  } catch (error) {
    throw new Error(`Error connecting to MongoDB: ${(error as Error).message}`)
  }
}

const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
    // @TODO: only log when config.appMode == 'dev
    console.log(`disconnecting from MongoDB successfully`)
  } catch (error) {
    throw new Error(`Error disconnecting from MongoDB: ${(error as Error).message}`)
  }
}

export { connectDB, disconnectDB }
