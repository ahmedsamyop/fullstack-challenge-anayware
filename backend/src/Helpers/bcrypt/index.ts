import bcrypt from 'bcrypt'
import config from '../../config'

const saltRounds: number = parseInt(config.bcryptSalt as string, 10)
const papper: string = config.bcryptPepper as string

const hashPassword = (password: string): string => {
  return bcrypt.hashSync(`${password}${papper}`, saltRounds)
}

const checkPassword = (password: string, hashPassword: string): boolean => {
  return bcrypt.compareSync(`${password}${papper}`, hashPassword)
}

export { hashPassword, checkPassword }
