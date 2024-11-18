import { NextFunction, Request, Response } from 'express'
import Error from '../interfaces/error.interface'

function errorRouteMiddleware(req: Request, res: Response, _next: NextFunction) {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  const resError: Error = {
    success: false,
    status_code: 404,
    error: 'Oops! Something went wrong.',
    message: `The requested URL: ${fullUrl} does not match any defined routes, please read the documentation for more information`,
  }
  res.status(resError.status_code || 404).json(resError)
}

export default errorRouteMiddleware
