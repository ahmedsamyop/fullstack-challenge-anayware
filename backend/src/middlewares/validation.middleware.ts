import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import customError from '../Helpers/customError'

const validationMiddleware = (schema: z.ZodObject<any, any>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body)
      // Validation Error
      if (!result.success) {
        throw customError({
          error: 'Validation failed',
          message: 'The provided data is invalid. Please check the input and try again.',
          status_code: 400,
          details: result.error.flatten().fieldErrors,
        })
      }
      // Validation success
      req.body = result.data
      next()
    } catch (error) {
      next(error)
    }
  }
}

// const vaildData = zodCreateUserSchema.safeParse(req.body)
// if (vaildData.success) {
//   console.log(vaildData)
//   res.json({})
// } else {
//   console.log(vaildData.error.flatten().fieldErrors)
//   res.json({})
// }

export default validationMiddleware
