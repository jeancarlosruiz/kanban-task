import 'server-only'
import { boards, columns, users } from '@/db/schema'
import { db } from '@/db'
import { eq, and, asc, desc } from 'drizzle-orm'

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

export const deleteAllColumnByBoardId = async (boardId: string) => {
  try {
    await db.delete(columns).where(eq(columns.boardId, boardId))
  } catch (error) {
    console.error('Error', error)
  }
}

export const createColumn = async (columnName: string, boardId: string) => {
  try {
    await db.insert(columns).values({
      name: columnName,
      boardId,
    })
  } catch (error) {
    console.error('Error creating a new column', error)
  }
}

export const updateColumnById = async (
  columnId: string,
  columnName: string
) => {
  try {
    await db
      .update(columns)
      .set({
        name: columnName,
      })
      .where(eq(columns.id, columnId))
  } catch (error) {
    console.error('Error updating the column in db', error)
  }
}
