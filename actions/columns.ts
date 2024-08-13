'use server'
import { columns } from '@/db/schema'
import { db } from '@/db'
import { auth } from '@/auth'
import { and, eq } from 'drizzle-orm'
import { boardSchema, taskSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { memoize } from 'nextjs-better-unstable-cache'
import { revalidateTag } from 'next/cache'
import { getCurrentUser } from './auth'

export const updateColumns = async (columnsArr: any, boardId: string) => {
  try {
    const savedColumns = await getColumns(boardId)

    if (savedColumns?.length === 0) return

    const columnsToDelete = savedColumns?.filter(
      (sst) => sst.boardId && !columnsArr.some((ssu: any) => ssu.id === sst.id)
    )

    columnsArr.forEach(async (sub: any) => {
      const isIncluded = savedColumns?.some((ss) => ss.id === sub.id)

      if (isIncluded) {
        await db
          .update(columns)
          .set({
            name: sub.name,
          })
          .where(eq(columns.id, sub.id))
      } else {
        await db.insert(columns).values({
          boardId,
          name: sub.name,
        })
      }
    })

    await deleteColumns(columnsToDelete)
  } catch (error) {
    console.log(error)
  }
}

export const deleteColumns = async (columnsArr: any) => {
  try {
    if (columnsArr.length === 0) return

    columnsArr.forEach(async (c: any) => {
      await db.delete(columns).where(eq(columns.id, c.id))
    })
  } catch (err) {
    console.log(err)
  }
}

export const getColumns = async (boardId: string) => {
  try {
    const allColumns = await db.query.columns.findMany({
      where: eq(columns.boardId, boardId),
    })

    return allColumns
  } catch (error) {
    console.log(error)
  }
}

export const addNewColumn = async (
  prev: any,
  formData: FormData,
  boardId: string
) => {
  try {
    const title = formData.get('name')

    await db.insert(columns).values({
      name: title,
      boardId,
    })

    revalidateTag('dashboard:boardSelected')

    return {
      message: 'Success',
      errors: null,
      fieldValues: {
        title: '',
      },
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'Error',
      errors: null,
      fieldValues: {
        title: '',
      },
    }
  }
}
