'use server'
import { columns } from '@/db/schema'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { columnObjSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { revalidateTag } from 'next/cache'

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

export const createColumns = async (columnsArr: any, boardId: string) => {
  try {
    columnsArr.forEach(async (el: any) => {
      await db.insert(columns).values({
        boardId,
        name: el.name,
      })
    })
  } catch (error) {
    console.log(error)
  }
}
