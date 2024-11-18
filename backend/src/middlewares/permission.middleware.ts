import type { NextFunction, Request, Response } from 'express'
import customError from '../Helpers/customError'
import User from '../types/user.type'
import { UserRole } from '../constants'
// import { UserRole } from '../constants'

const permissionMiddleware = (...userRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { _id, role } = req.userAuthData as User
      const permissionUserRole = userRoles.filter((userRole) => userRole == role)[0]?.toString()

      // userRoles array is empty @param userRoles & usrRoles not matching role for user auth data
      if (!userRoles.length || !permissionUserRole) {
        throw customError({
          error: 'Error Permission',
          message: 'You do not have permission to perform this action.',
          status_code: 403,
        })
      }

      //admin permission
      if (permissionUserRole === UserRole.admin) {
        next()
        return
      }
      //instructor permission
      if (permissionUserRole === UserRole.instructor) {
        next()
        return
      }
      //user permission
      if (permissionUserRole === UserRole.user && _id == req.params.id) {
        next()
      } else {
        throw customError({
          error: 'Error Permission',
          message: 'You do not have permission to perform this action.',
          status_code: 403,
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

export default permissionMiddleware
