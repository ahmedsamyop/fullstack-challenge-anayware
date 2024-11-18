import mongoose from 'mongoose'
import userSchema from './schema/userSchema'
import type User from '../types/user.type'
import { connectDB, disconnectDB } from '../database'
import customError from '../Helpers/customError'
import { checkPassword, hashPassword } from '../Helpers/bcrypt'

const UserMongo = mongoose.model('Users', userSchema)

class UserModel {
  static async getAll() {
    try {
      await connectDB()
      const response = await UserMongo.find({}, '-password')
      await disconnectDB()
      return response
    } catch (error) {
      await disconnectDB()
      throw new Error((error as Error).message)
    }
  }
  static async getById(id: string) {
    try {
      await connectDB()
      const response = await UserMongo.findOne({ _id: id }, '-password')
      await disconnectDB()
      if (!response) {
        throw customError({
          status_code: 404,
          error: 'User not found',
          message: 'The user with the specified ID or Email does not exist.',
        })
      }
      return response
    } catch (error) {
      await disconnectDB()
      throw customError(error as Error)
    }
  }
  static async create(user: User) {
    try {
      // hashing password
      user.password = hashPassword(user.password as string)
      // connect database create user
      await connectDB()
      const response = await UserMongo.create(user)
      await response.save()
      await disconnectDB()
      return response
    } catch (error) {
      await disconnectDB()
      // handel error when creating user with email already exists
      if ((error as Error as any).code === 11000) {
        throw customError({
          error: 'Email already exists',
          message: 'The email address you entered is already in use.',
          status_code: 409,
          details: {
            email: ['The email address you entered is already in use.'],
          },
        })
      }
      // send unkown error message to error middleware
      throw new Error((error as Error).message)
    }
  }
  static async updateById(id: string, user: User) {
    try {
      await connectDB()
      const response = await UserMongo.findByIdAndUpdate({ _id: id }, user, { new: true })
      await disconnectDB()
      if (!response) {
        throw customError({
          status_code: 404,
          error: 'User not found',
          message: 'The user with the specified ID or Email does not exist.',
        })
      }
      return response
    } catch (error) {
      await disconnectDB()
      throw customError(error as Error)
    }
  }
  static async deleteById(id: string) {
    try {
      await connectDB()
      const response = await UserMongo.deleteOne({ _id: id })
      await disconnectDB()
      if (!response.deletedCount) {
        throw customError({
          status_code: 404,
          error: 'User not found or already deleted',
          message: 'The user with the specified ID or Email does not exist or has been deleted',
        })
      }
      return response
    } catch (error) {
      await disconnectDB()
      throw customError(error as Error)
    }
  }
  static async authenticate(email: string, password: string) {
    try {
      await connectDB()
      // Get user from database by email
      const response = await UserMongo.findOne({ email })
      // disconnect database
      await disconnectDB()
      // check if user exists
      if (response?.password) {
        // check user vaild password
        const isValidPassword = checkPassword(password, response.password)
        //valid password
        if (isValidPassword) {
          // response user
          return response
        }
      }
      // user not found or invalid Password theow Error
      throw customError({
        message: 'Unable to login Email or password is incorrect Please try again',
        error: 'Authenticate failed',
        status_code: 401,
      })
    } catch (error) {
      await disconnectDB()
      throw customError(error as Error)
    }
  }
}

export default UserModel
