'use server'
import { columns } from '@/db/schema'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { columnObjSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { revalidateTag } from 'next/cache'
import { Column, NewColumn } from '@/types'

export const updateColumns = async (columnsArr: Column[], boardId: string) => {
  try {
    const savedColumns = await getColumns(boardId)

    const columnsToDelete = savedColumns?.filter(
      (sst) =>
        sst.boardId && !columnsArr.some((ssu: Column) => ssu.id === sst.id)
    )

    columnsArr.forEach(async (sub: Column) => {
      const isIncluded = savedColumns?.find((ss) => ss.id === sub.id)
      if (isIncluded) {
        // If havent been edited, skip it
        if (isIncluded.name.toLowerCase() === sub.name.toLowerCase()) return

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

    if (columnsToDelete && columnsToDelete?.length > 0) {
      await deleteColumns(columnsToDelete)
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteColumns = async (columnsArr: Column[]) => {
  try {
    if (columnsArr.length === 0) return

    columnsArr.forEach(async (c: Column) => {
      await db.delete(columns).where(eq(columns.id, c.id))
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteAllColumns = async (boardId: string) => {
  try {
    if (!boardId) return
    await db.delete(columns).where(eq(columns.boardId, boardId))
    revalidateTag('dashboard:boardSelected')
  } catch (error) {
    console.log(error)
  }
}

export const getColumns = async (boardId: string) => {
  try {
    const allColumns = await db.query.columns.findMany({
      where: eq(columns.boardId, boardId),
      orderBy: columns.createdAt,
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
    const column = columnObjSchema.parse({
      name: formData.get('name'),
    })

    await db.insert(columns).values({
      name: column.name,
      boardId,
    })

    revalidateTag('dashboard:boardSelected')

    return {
      message: 'success',
      errors: null,
      fieldValues: {
        name: '',
      },
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError
      const errorMap = zodError.flatten().fieldErrors
      const { name } = errorMap
      return {
        message: 'error',
        errors: {
          name,
        },
        fieldValues: {
          name: '',
        },
      }
    }
  }
}

export const createColumns = async (
  columnsArr: NewColumn[],
  boardId: string
) => {
  try {
    columnsArr.forEach(async (el: NewColumn) => {
      await db.insert(columns).values({
        boardId,
        name: el.name,
      })
    })
  } catch (error) {
    console.log(error)
  }
}
