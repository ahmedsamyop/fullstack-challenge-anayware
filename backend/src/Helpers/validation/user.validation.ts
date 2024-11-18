import { z } from 'zod'

const zodCreateUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').trim(),
  email: z.string().email('Email Invalid example: user@example.com'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
const zodUpdateUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').trim().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const zodAuthUserSchema = z.object({
  email: z.string().email('Email Invalid example: user@example.com'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export { zodCreateUserSchema, zodUpdateUserSchema, zodAuthUserSchema }
