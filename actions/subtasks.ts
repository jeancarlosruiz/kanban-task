'use server'
import { subtasks } from '@/db/schema'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'

export const deleteSubtasks = async (subtasksArr: any) => {
  try {
    subtasksArr.forEach(async (sub: any) => {
      await db.delete(subtasks).where(eq(subtasks.id, sub.id))
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateSubtasks = async (subtasksToUpdate: any, taskId: string) => {
  try {
    const savedSubtasks = await db.query.subtasks.findMany({
      where: eq(subtasks.taskId, taskId),
    })

    const subtasksToDelete = savedSubtasks.filter(
      (sst) =>
        sst.taskId && !subtasksToUpdate.some((ssu: any) => ssu.id === sst.id)
    )

    // console.log({ subtasksToUpdate, savedSubtasks, subtasksToDelete })

    subtasksToUpdate.forEach(async (sub: any) => {
      const isIncluded = savedSubtasks.some((ss) => ss.id === sub.id)

      // console.log(sub.taskId)

      if (isIncluded) {
        await db
          .update(subtasks)
          .set({
            title: sub.title,
          })
          .where(eq(subtasks.id, sub.id))
      } else {
        await db.insert(subtasks).values({
          taskId: taskId,
          title: sub.title,
        })
      }
    })

    await deleteSubtasks(subtasksToDelete)
  } catch (error) {
    console.log(error)
  }
}

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
