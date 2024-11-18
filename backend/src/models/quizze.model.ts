import mongoose from 'mongoose'
import quizzeSchema from './schema/quizzeSchema'
import type Quizze from '../types/quizze.type'
import { connectDB, disconnectDB } from '../database'
import customError from '../Helpers/customError'

const QuizzeMongo = mongoose.model('Quizzes', quizzeSchema)

class QuizzeModel {
  static async getAll() {
    try {
      await connectDB()
      const response = await QuizzeMongo.find()
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
      const response = await QuizzeMongo.findOne({ _id: id })
      await disconnectDB()
      if (!response) {
        throw customError({
          status_code: 404,
          error: 'Quizze not found',
          message: 'Quizze with the specified ID not exist.',
        })
      }
      return response
    } catch (error) {
      await disconnectDB()
      throw customError(error as Error)
    }
  }
  static async create(quizze: Quizze) {
    try {
      await connectDB()
      const response = await QuizzeMongo.create(quizze)
      await response.save()
      await disconnectDB()
      return response
    } catch (error) {
      await disconnectDB()
      throw new Error((error as Error).message)
    }
  }
  static async updateById(id: string, quizze: Quizze) {
    try {
      await connectDB()
      const response = await QuizzeMongo.findByIdAndUpdate({ _id: id }, quizze, { new: true })
      await disconnectDB()
      if (!response) {
        throw customError({
          status_code: 404,
          error: 'Quizze not found',
          message: 'Quizze with the specified ID not exist.',
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
      const response = await QuizzeMongo.deleteOne({ _id: id })
      await disconnectDB()
      if (!response.deletedCount) {
        throw customError({
          status_code: 404,
          error: 'Quizze not found or already deleted',
          message: 'Quizze with the specified ID does not exist or has been deleted',
        })
      }
      return response
    } catch (error) {
      await disconnectDB()
      throw customError(error as Error)
    }
  }
}

export default QuizzeModel
