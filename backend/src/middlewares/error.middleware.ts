import { NextFunction, Request, Response } from 'express'
import Error from '../interfaces/error.interface'

function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const resError: Error = {
    success: err.success || false,
    status_code: err.status_code || 500,
    error: err.error || 'Oops! Something went wrong.',
    message:
      err.message ||
      'An unexpected error occurred. Our team is working to resolve the issue. Please try again later.',
    stack: err.stack || undefined,
    details: err.details || undefined,
  }
  res.status(err.status_code || 500).json(resError)
}

export default errorMiddleware
