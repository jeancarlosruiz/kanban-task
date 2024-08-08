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

    // console.log('here')

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
