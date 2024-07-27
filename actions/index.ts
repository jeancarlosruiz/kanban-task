'use server'
import { signIn, signOut } from '@/auth'
import { register } from '@/db/user'
import { signInSchema, signupSchema, UserExistError } from '@/lib/zod'
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

export const signup = async (prevState: any, formData: FormData) => {
  try {
    const isValid = signupSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      repeatPassword: formData.get('repeatPassword'),
    })

    if (isValid) {
      await register(isValid)
    }

    return {
      message: 'success',
      errors: null,
      data: null,
      fieldValues: {
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
      },
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError
      const errorMap = zodError.flatten().fieldErrors
      const { name, email, password, repeatPassword } = errorMap

      return {
        message: 'error',
        errors: {
          name,
          email,
          password,
          repeatPassword,
        },
        fieldValues: {
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
          repeatPassword: formData.get('repeatPassword'),
        },
      }
    }

    if (error instanceof UserExistError) {
      return {
        message: 'error',
        errors: {
          email: ['Email is already used'],
        },
        fieldValues: {
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
          repeatPassword: formData.get('repeatPassword'),
        },
      }
    }

    throw error
  }
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
  await signOut({ redirectTo: '/signin' })
}
