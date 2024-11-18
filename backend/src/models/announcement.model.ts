import mongoose from 'mongoose'
import announcementSchema from './schema/announcementSchema'
import type Announcement from '../types/announcement.type'
import { connectDB, disconnectDB } from '../database'
import customError from '../Helpers/customError'

const AnnouncementMongo = mongoose.model('Announcements', announcementSchema)

class AnnouncementModel {
  static async getAll() {
    try {
      await connectDB()
      const response = await AnnouncementMongo.find().populate({
        path: 'userRef',
        select: 'name email',
      })
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
      const response = await AnnouncementMongo.findOne({ _id: id }).populate({
        path: 'userRef',
        select: 'name email',
      })
      await disconnectDB()
      if (!response) {
        throw customError({
          status_code: 404,
          error: 'Announcement not found',
          message: 'Announcement with the specified ID not exist.',
        })
      }
      return response
    } catch (error) {
      await disconnectDB()
      throw customError(error as Error)
    }
  }
  static async create(announcement: Announcement) {
    try {
      await connectDB()
      const response = await AnnouncementMongo.create(announcement)
      await response.save()
      await disconnectDB()
      return response
    } catch (error) {
      await disconnectDB()
      throw new Error((error as Error).message)
    }
  }
  static async updateById(id: string, announcement: Announcement) {
    try {
      await connectDB()
      const response = await AnnouncementMongo.findByIdAndUpdate({ _id: id }, announcement, {
        new: true,
      })
      await disconnectDB()
      if (!response) {
        throw customError({
          status_code: 404,
          error: 'Announcement not found',
          message: 'Announcement with the specified ID not exist.',
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
      const response = await AnnouncementMongo.deleteOne({ _id: id })
      await disconnectDB()
      if (!response.deletedCount) {
        throw customError({
          status_code: 404,
          error: 'Announcement not found or already deleted',
          message: 'Announcement with the specified ID does not exist or has been deleted',
        })
      }
      return response
    } catch (error) {
      await disconnectDB()
      throw customError(error as Error)
    }
  }
}

export default AnnouncementModel
