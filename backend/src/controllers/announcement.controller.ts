import type { NextFunction, Request, Response } from 'express'
import type Announcement from '../types/announcement.type'

import AnnouncementModel from '../models/announcement.model'
import customeResBody from '../Helpers/customResBody'
import User from '../types/user.type'

class AnnouncementController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AnnouncementModel.getAll()
      const resBody = customeResBody(
        response,
        response.length
          ? 'Display all Announcements successfully'
          : 'Announcements are not available now',
      )
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const response = await AnnouncementModel.getById(id)
      const resBody = customeResBody(response, 'Display Announcements successfully')
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const announcement: Announcement = {
        title: req.body.title,
        content: req.body.content,
        userRef: (req.userAuthData as User)._id?.toString(), // userAuthData -> id
      }
      const response = await AnnouncementModel.create(announcement)
      const resBody = customeResBody(response, 'Announcement created successfully', 201)
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const announcement: Announcement = {
        title: req.body.title,
        content: req.body.content,
      }
      const response = await AnnouncementModel.updateById(id, announcement)
      const resBody = customeResBody(response, 'Announcement updated successfully')
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await AnnouncementModel.deleteById(id)
      const resBody = customeResBody(null, 'Announcement deleted successfully')
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
}
export default AnnouncementController
