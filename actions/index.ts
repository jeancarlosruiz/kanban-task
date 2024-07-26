'use server'
import { signIn, signOut } from '@/auth'
import { register } from '@/db/user'
import { signInSchema, signupSchema } from '@/lib/zod'
import { DEFAULT_REDIRECT } from '@/utils/routes'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { ZodError } from 'zod'

export const signinGithub = async () => {
  await signIn('github', { redirectTo: DEFAULT_REDIRECT })
}

export const signinGoogle = async () => {
  await signIn('google', { redirectTo: DEFAULT_REDIRECT })
}

export const signup = async (formData: FormData) => {
  try {
    const email = formData.get('email')
    const name = formData.get('name')
    const password = formData.get('password')
    const repeatPassword = formData.get('repeatPassword')

    const credentials = await signupSchema.parseAsync({
      email,
      name,
      password,
      repeatPassword,
    })

    // todo: is not the same password
    if (password !== repeatPassword) return null
    await register(credentials)
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error)
      return null
    }
  }
  // redirect('/dashboard')
}

export const login = async (prevState: any, formData: FormData) => {
  try {
    const isValid = signInSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (isValid) {
      const { email, password } = isValid

      await signIn('credentials', {
        email,
        password,
        redirectTo: DEFAULT_REDIRECT,
      })
    }

    return {
      message: 'success',
      errors: null,
      data: null,
      fieldValues: {
        email: '',
        password: '',
      },
    }
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.type)

      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }

    if (error instanceof ZodError) {
      console.log(error)

      const zodError = error as ZodError
      const errorMap = zodError.flatten().fieldErrors
      const { email, password } = errorMap

      return {
        message: 'error',
        errors: {
          email,
          password,
        },
        fieldValues: {
          email: formData.get('email'),
          password: formData.get('password'),
        },
      }
    }

    throw error
  }
}

export const signout = async () => {
  await signOut()
  redirect('/signin')
}
