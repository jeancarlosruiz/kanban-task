'use server'
import { subtasks } from '@/db/schema'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { NewSubtasks, Subtasks } from '@/types'

export const deleteSubtasks = async (subtasksArr: Subtasks[]) => {
  try {
    subtasksArr.forEach(async (sub: Subtasks) => {
      await db.delete(subtasks).where(eq(subtasks.id, sub.id))
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateSubtasks = async (
  subtasksToUpdate: Subtasks[],
  taskId: string
) => {
  try {
    const savedSubtasks = await db.query.subtasks.findMany({
      where: eq(subtasks.taskId, taskId),
    })

    const subtasksToDelete = savedSubtasks.filter(
      (sst) =>
        sst.taskId &&
        !subtasksToUpdate.some((ssu: Subtasks) => ssu.id === sst.id)
    )

    subtasksToUpdate.forEach(async (sub: Subtasks) => {
      const isIncluded = savedSubtasks.some((ss) => ss.id === sub.id)

      if (isIncluded) {
        const subId = sub.id!

        await db
          .update(subtasks)
          .set({
            title: sub.title,
          })
          .where(eq(subtasks.id, subId))
      } else {
        await db.insert(subtasks).values({
          taskId: taskId,
          title: sub.title,
        })
      }
    })

    if (subtasksToDelete && subtasksToDelete.length !== 0) {
      await deleteSubtasks(subtasksToDelete)
    }
  } catch (error) {
    console.log(error)
  }
}

export const completeSubtask = async (id: string, value: boolean) => {
  try {
    await db
      .update(subtasks)
      .set({ isCompleted: value })
      .where(eq(subtasks.id, id))

    revalidateTag('dashboard:boardSelected')
  } catch (error) {
    console.log(error)
  }
}

export const createSubtasks = async (
  subtasksArr: NewSubtasks[],
  taskId: string
) => {
  try {
    subtasksArr.forEach(async ({ title }: { title: string }) => {
      await db.insert(subtasks).values({
        taskId,
        title,
      })
    })
  } catch (error) {
    console.log(error)
  }
}
