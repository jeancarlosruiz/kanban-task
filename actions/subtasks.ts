'use server'
import { boards, columns, subtasks, tasks, users } from '@/db/schema'
import { db } from '@/db'
import { auth } from '@/auth'
import { and, eq } from 'drizzle-orm'
import { boardSchema, taskSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { memoize } from 'nextjs-better-unstable-cache'
import { revalidateTag } from 'next/cache'
import { getCurrentUser } from './auth'

export const completeSubtask = async (id: string, bool: boolean) => {
  try {
    await db
      .update(subtasks)
      .set({ isCompleted: bool })
      .where(eq(subtasks.id, id))

    revalidateTag(`dashboard:tasks`)
  } catch (error) {
    console.log(error)
  }
}
