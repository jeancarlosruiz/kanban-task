import { object, string } from 'zod'

export const signInSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' }).min(
    1,
    'Password is required'
  ),
})

export const signupSchema = object({
  username: string({ required_error: 'Username is required' }).min(
    1,
    'Username is required'
  ),
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  repeatPassword: string({ required_error: 'Repeat password is required' })
    .min(1, 'Repeat password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})
