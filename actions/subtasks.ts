'use server'
import { subtasks } from '@/db/schema'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'

export const completeSubtask = async (id: string, bool: boolean) => {
  try {
    await db
      .update(subtasks)
      .set({ isCompleted: bool })
      .where(eq(subtasks.id, id))

    revalidateTag('dashboard:boardSelected')
  } catch (error) {
    console.log(error)
  }
}
