'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { profileSchema } from '@/lib/zod'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { ZodError } from 'zod'

export const editProfile = async (
  prev: any,
  formData: FormData,
  userId: string
) => {
  try {
    if (!userId) return

    const profile = profileSchema.parse({
      name: formData.get('name'),
    })

    await db
      .update(users)
      .set({
        name: profile.name,
      })
      .where(eq(users.id, userId))

    revalidateTag('dashboard:user')

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

export const deleteUser = async (userId: string) => {
  try {
    if (!userId) return
    await db.delete(users).where(eq(users.id, userId))
  } catch (error) {
    console.log(error)
  }
}
