import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../Helpers/jwt'
import type { JwtPayload } from 'jsonwebtoken'
import UserModel from '../models/user.model'
import customError from '../Helpers/customError'

const protectAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const clientHeaderAuth = req.get('Authorization')
    // check client has heaer authorization
    if (clientHeaderAuth && clientHeaderAuth.startsWith('Bearer ')) {
      // asgine client authorization value to token variable
      const token = clientHeaderAuth.split(' ')[1]
      // verify Token and asgine data to decodedToken variable
      const decodedToken = await verifyToken(token)
      // check decodedToken vaild
      if ((decodedToken as JwtPayload).iat) {
        // check user exists when get id from decodedToken variable
        const userExists = await UserModel.getById((decodedToken as JwtPayload)._id)
        // Check if user change password after token created
        const userUpdateAt = parseInt(`${new Date(userExists.updatedAt).getTime() / 1000}`)
        const tokenCreateAt = (decodedToken as JwtPayload).iat as number
        // check user updated  < token created
        if (userUpdateAt < tokenCreateAt) {
          // check true
          req.userAuthData = userExists
          next()
          // done
        } else {
          // check false
          throw customError({
            message: 'Authorization failed. Please check your credentials and try again.',
            error: 'Authorization failed',
            status_code: 401,
          })
        }
      }
    } else {
      // Authorization failed Error
      throw customError({
        message: 'Authorization failed. Please check your credentials and try again.',
        error: 'Authorization failed',
        status_code: 401,
      })
    }
  } catch (error) {
    next(error)
  }
}

export default protectAuth
