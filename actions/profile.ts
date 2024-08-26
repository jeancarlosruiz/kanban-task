'use server'

import { ZodError } from 'zod'

export const editProfile = async (
  prev: any,
  formData: FormData,
  userId: string
) => {
  try {
    console.log(userId)

    return {
      message: 'success',
      errors: null,
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError
      const errorMap = zodError.flatten().fieldErrors

      return {
        message: 'error',
        errors: errorMap,
      }
    }
  }
}
