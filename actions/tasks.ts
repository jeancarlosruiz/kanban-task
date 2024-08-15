'use server'
import { tasks } from '@/db/schema'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { taskSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { revalidateTag } from 'next/cache'
import { createSubtasks, updateSubtasks } from './subtasks'

export const updateTask = async (prev: any, formData: FormData, id: string) => {
  const subtasksJSON: any = formData.get('subtasks')
  const statusJSON: any = formData.get('status')
  const newSubtasks = JSON.parse(subtasksJSON)

  try {
    const taskUpdated = taskSchema.parse({
      name: formData.get('title'),
      description: formData.get('description'),
      subtasks: newSubtasks,
      status: statusJSON ? JSON.parse(statusJSON) : '',
    })

    await db
      .update(tasks)
      .set({
        title: taskUpdated.name,
        description: taskUpdated.description,
        status: taskUpdated.status.name,
        columnId: taskUpdated.status.id,
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

  try {
    const newTask = taskSchema.parse({
      name: formData.get('name'),
      description: formData.get('description'),
      subtasks: newSubtasks,
      status: statusJSON ? JSON.parse(statusJSON) : '',
    })

    const taskRow = await db
      .insert(tasks)
      .values({
        columnId: newTask?.status?.id,
        title: newTask.name,
        description: newTask.description,
        status: newTask.status.name,
      })
      .returning({ id: tasks.id })

    if (newSubtasks.length) {
      await createSubtasks(newTask.subtasks, taskRow[0].id)
    }

    revalidateTag('dashboard:boardSelected')

    return {
      message: 'success',
      errors: null,
      fieldValues: {
        title: '',
        description: '',
        subtasks: '',
        status: '',
      },
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError
      const errorMap = zodError.flatten().fieldErrors

      return {
        message: 'error',
        errors: errorMap,
        fieldValues: {
          title: formData.get('title'),
          description: formData.get('description'),
          subtasks: formData.get('subtasks'),
          status: formData.get('status'),
        },
      }
    }

    console.log(error)
  }
}
