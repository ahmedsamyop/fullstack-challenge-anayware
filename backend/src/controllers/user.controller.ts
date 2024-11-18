import type { NextFunction, Request, Response } from 'express'
import type User from '../types/user.type'

import UserModel from '../models/user.model'
import customeResBody from '../Helpers/customResBody'
import { createToken } from '../Helpers/jwt'

class UserController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserModel.getAll()
      const resBody = customeResBody(
        response,
        response.length ? 'Display all users successfully' : 'Users are not available now',
      )
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const response = await UserModel.getById(id)
      const resBody = customeResBody(response, 'Display user successfully')
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }
      const response = await UserModel.create(user)
      const resBody = customeResBody(response, 'User created successfully', 201)
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { name, password } = req.body
      const response = await UserModel.updateById(id, { name, password })
      const resBody = customeResBody(response, 'User updated successfully')
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await UserModel.deleteById(id)
      const resBody = customeResBody(null, 'User deleted successfully')
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }

  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      // get user when authenticating successful
      const response = await UserModel.authenticate(email, password)
      // token data payload
      const userInPayloadToken: User = { _id: response._id.toString(), role: response.role }
      // create token
      const token = await createToken(userInPayloadToken)
      // response data {_id, role, token}
      const resBody = customeResBody(
        { ...userInPayloadToken, token },
        `${userInPayloadToken.role} Authentication successful`,
      )

      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
