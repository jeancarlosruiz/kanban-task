'use server'
import { subtasks, tasks } from '@/db/schema'
import { db } from '@/db'
import { and, eq } from 'drizzle-orm'
import { taskSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { revalidateTag } from 'next/cache'
import { updateSubtasks } from './subtasks'

export const updateTask = async (prev: any, formData: FormData, id: string) => {
  const subtasksJSON: any = formData.get('subtasks')
  const statusJSON: any = formData.get('status')
  const newSubtasks = JSON.parse(subtasksJSON)
  const status = JSON.parse(statusJSON)

  try {
    await db
      .update(tasks)
      .set({
        title: formData.get('title'),
        description: formData.get('description'),
        status: status.name,
        columnId: status.id,
      })
      .where(eq(tasks.id, id))

    await updateSubtasks(newSubtasks, id)

    revalidateTag('dashboard:boardSelected')

    return {
      message: 'success',
      errors: null,
      fieldValues: {
        title: '',
        description: '',
        subtasks: [],
      },
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError
      const errorMap = zodError.flatten().fieldErrors
      //!  const { name, columns } = errorMap

      console.log('zod error', error)

      return {
        message: 'error',
        errors: errorMap,
        fieldValues: {
          title: formData.get('title'),
          description: formData.get('description'),
        },
      }
    }

    console.log(error)
  }
}

export const deleteTask = async (id: string) => {
  try {
    await db.delete(tasks).where(eq(tasks.id, id))
    revalidateTag(`dashboard:tasks`)
  } catch (error) {
    console.log(error)
  }
}

export const addNewTask = async (prev: any, formData: FormData) => {
  const subtasksJSON: any = formData.get('subtasks')
  const statusJSON: any = formData.get('status')
  const newSubtasks = JSON.parse(subtasksJSON)
  const status = JSON.parse(statusJSON)

  try {
    const newTask = taskSchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
      subtasks: newSubtasks,
      status,
    })

    const taskRow = await db
      .insert(tasks)
      .values({
        columnId: status.id,
        title: newTask.title,
        description: newTask.description,
        status: status.name,
      })
      .returning({ id: tasks.id })

    if (newSubtasks.length) {
      newSubtasks.forEach(async ({ title }: { title: string }) => {
        await db.insert(subtasks).values({
          taskId: taskRow[0].id,
          title,
        })
      })
    }

    revalidateTag('dashboard:boardSelected')

    return {
      message: 'success',
      errors: null,
      fieldValues: {
        title: '',
        description: '',
        subtasks: [],
      },
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError
      const errorMap = zodError.flatten().fieldErrors
      //!  const { name, columns } = errorMap

      console.log('zod error', error)

      return {
        message: 'error',
        errors: errorMap,
        fieldValues: {
          title: formData.get('title'),
          description: formData.get('description'),
        },
      }
    }

    console.log(error)
  }
}
