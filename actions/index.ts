'use server'
import { signIn, signOut } from '@/auth'
import { register } from '@/db/user'
import { signInSchema, signupSchema } from '@/lib/zod'
import { DEFAULT_REDIRECT } from '@/utils/routes'
import { AuthError } from 'next-auth'
import { ZodError } from 'zod'

export const signup = async (formData: FormData) => {
  try {
    const email = formData.get('email')
    const username = formData.get('username')
    const password = formData.get('password')
    const repeatPassword = formData.get('repeatPassword')

    const credentials = await signupSchema.parseAsync({
      email,
      username,
      password,
      repeatPassword,
    })

    if (password !== repeatPassword) return null
    await register(credentials)
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error)
      return null
    }
  }
}

export const login = async (formData: FormData) => {
  const formEmail = formData.get('email')
  const formPassword = formData.get('password')

  const isValid = signInSchema.safeParse({
    email: formEmail,
    password: formPassword,
  })

  if (!isValid.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = isValid.data

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

export const signout = async () => {
  await signOut()
}
