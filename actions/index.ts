'use server'
import 'dotenv/config'
import { signIn } from '@/auth'
import { signupDB } from '@/db/user'
import { DEFAULT_REDIRECT } from '@/utils/routes'
import { AuthError } from 'next-auth'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'
import { comparePW, hashPW } from '@/utils/auth'

// export const getUserByEmail = async (email: string) => {
//   try {
//     const user = await db.query.users.findFirst({
//       where: eq(users.email, email),
//     })

//     return user
//   } catch (error) {
//     return null
//   }
// }

// export const singin = async ({
//   email,
//   password,
// }: {
//   email: string
//   password: string
// }) => {
//   const match = await db.query.users.findFirst({
//     where: eq(users.email, email),
//   })

//   console.log({ match })

//   if (!match) return null

//   console.log('hey', match.password)
//   // const hash = await hashPW(password)

//   const correctPW = await comparePW(password, match.password)

//   console.log({ correctPW })

//   if (!correctPW) return null

//   //   const token = createTokenForUser(match.id)
//   //   const { password: pw, ...user } = match

//   //   console.log('aqui', user, token)

//   //   return { user, token }
// }

// // export const signup = async ({
// export const signupDB = async ({
//   username,
//   email,
//   password,
// }: {
//   username: string
//   email: string
//   password: string
// }) => {
//   const hashedPW = await hashPW(password)
//   const rows = await db
//     .insert(users)
//     .values({ username, email, password: hashedPW })
//     .returning({
//       id: users.id,
//       username: users.username,
//       email: users.email,
//       createdAt: users.createdAt,
//     })

//   console.log(rows[0])
//   //   const user = rows[0]
//   //   const token = createTokenForUser(user.id)

//   //   return { user, token }
// }

export const signup = async (formData: FormData) => {
  // Crear zod validation
  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // console.log(username, email, password)

  const newUser = await signupDB({ username, email, password })

  console.log(newUser)
}

export const login = async (formData: FormData) => {
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }

    throw error
  }
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
