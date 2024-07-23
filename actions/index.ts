'use server'
import { signIn } from '@/auth'
import bcrypt from 'bcryptjs'

export const hashPW = async (password: any) => {
  return await bcrypt.hash(password, 10)
}

export const comparePW = async (password: string, hashedPW: string) => {
  return await bcrypt.compare(password, hashedPW)
}

export const login = async (formData: FormData) => {
  await signIn('credentials', formData)
}

// export const login = async (prevState: any, formData: FormData) => {
//   try {
//     const logUser = signInSchema.parse({
//       email: formData.get('email'),
//       password: formData.get('password'),
//     })

//     if (logUser) {
//       await signIn('credentials', logUser, { redirectTo: '/dashboard' })
//     }

//     return {
//       message: 'success',
//       errors: undefined,
//       data: undefined,
//       fieldValues: {
//         email: '',
//         password: '',
//       },
//     }
//   } catch (error) {
//     if (error instanceof ZodError) {
//       const zodError = error as ZodError
//       const errorMap = zodError.flatten().fieldErrors
//       const { email, password } = errorMap
//       return {
//         message: 'error',
//         errors: {
//           email: email ?? undefined,
//           password: password ?? undefined,
//         },
//         fieldValues: {
//           email: formData.get('email'),
//           password: formData.get('password'),
//         },
//       }
//     }
//   }
// }
