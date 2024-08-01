'use server'
import { boards, columns, users } from '@/db/schema'
import { db } from '@/db'
import { auth } from '@/auth'
import { and, eq } from 'drizzle-orm'
import { boardSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { getUserById } from '@/db/user'

export const boardSelected = async () => {
  try {
    const session = await auth()

    const { id }: any = session?.user
    const user = await getUserById(id)

    if (!user?.boardSelected) {
      const firstBoard = await db.query.boards.findFirst({
        where: eq(boards.userId, id),
      })

      console.log(firstBoard)

      if (firstBoard) {
        const boardId = firstBoard?.id as string

        await db
          .update(users)
          .set({
            boardSelected: boardId,
          })
          .where(eq(users.id, id))

        return firstBoard
      }

      return []
    }

    const getSavedBoard = await db.query.boards.findFirst({
      where: and(eq(boards.userId, id), eq(boards.id, user?.boardSelected)),
    })

    return getSavedBoard
  } catch (error) {
    console.log(error, 'Algo ah salido mal')
  }
}

export const getBoardSelected = async (id: string) => {}

export const getBoards = async () => {
  const session = await auth()
  const { id }: any = session?.user

  const allBoards = await db
    .select({ id: boards.id, name: boards.name })
    .from(boards)
    .where(eq(boards.userId, id))

  return allBoards
}

export const createBoard = async (prevState: any, formData: FormData) => {
  const session = await auth()
  const { id }: any = session?.user
  const columnsJSON: any = formData.get('columns')
  const newColumns = JSON.parse(columnsJSON)

  try {
    const board = boardSchema.parse({
      name: formData.get('name'),
    })

    const newBoard = await db
      .insert(boards)
      .values({
        userId: id,
        name: board.name,
      })
      .returning({ id: boards.id })

    if (newColumns.length > 0) {
      newColumns.forEach(async (el: any) => {
        await db.insert(columns).values({
          boardId: newBoard[0].id,
          name: el.name,
        })
      })
    }

    return {
      message: 'success',
      errors: null,
      data: null,
      fieldValues: {
        name: '',
        columns: '',
      },
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError
      const errorMap = zodError.flatten().fieldErrors
      const { name, columns } = errorMap

      return {
        message: 'error',
        errors: {
          name,
          columns,
        },
        fieldValues: {
          name: formData.get('name'),
          columns: formData.get('columns'),
        },
      }
    }
  }
}
