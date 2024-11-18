import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import customError from '../customError'

// const expireTime: number = 2 * 24 * 60 * 60; // 2 days
const expireTime: string = '3h'

export const createToken = async (payload: object): Promise<string> => {
  try {
    return jwt.sign(payload, config.jwtTokenSecret as string, {
      expiresIn: expireTime,
    })
  } catch (error) {
    throw customError({
      error: 'Error Authorization failed',
      message: `Authorization failed. Please check your credentials and try again.`,
      status_code: 401,
      stack: `${(error as Error).message}|||||${(error as Error).stack}`,
    })
  }
}

export const verifyToken = async (token: string): Promise<JwtPayload | string> => {
  try {
    return jwt.verify(token, config.jwtTokenSecret as string, { complete: false })
  } catch (error) {
    throw customError({
      error: 'Error Authorization failed',
      message: `Authorization failed. Please check your credentials and try again.`,
      status_code: 401,
      stack: `${(error as Error).message}|||||${(error as Error).stack}`,
    })
  }
}
