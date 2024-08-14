'use server'
import { boards, columns, users } from '@/db/schema'
import { db } from '@/db'
import { auth } from '@/auth'
import { and, eq } from 'drizzle-orm'
import { boardSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { memoize } from 'nextjs-better-unstable-cache'
import { revalidateTag } from 'next/cache'
import { getCurrentUser } from './auth'
import { createColumns, updateColumns } from './columns'

export const editBoard = async (
  prev: any,
  formData: FormData,
  boardId: string
) => {
  try {
    const columnsJSON: any = formData.get('columns')
    const columnsParse = JSON.parse(columnsJSON)

    const board = boardSchema.parse({
      name: formData.get('name'),
      columns: columnsParse,
    })

    await db
      .update(boards)
      .set({
        name: board.name,
      })
      .where(eq(boards.id, boardId))

    await updateColumns(columnsParse, boardId)

    revalidateTag('dashboard:boardSelected')

    return {
      message: 'Success',
      data: null,
      errors: null,
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

export const getBoardSelected = memoize(
  async (userId: string, boardSelectedId: string) => {
    try {
      if (!boardSelectedId) {
        const firstBoard = await db.query.boards.findFirst({
          where: eq(boards.userId, userId),
          with: {
            columns: {
              with: {
                tasks: {
                  with: { subtasks: true },
                },
              },
            },
          },
        })

        if (!firstBoard) return null

        const boardId = firstBoard?.id as string

        await db
          .update(users)
          .set({
            boardSelected: boardId,
          })
          .where(eq(users.id, userId))

        return firstBoard
      }

      const getSavedBoard = await db.query.boards.findFirst({
        where: and(eq(boards.userId, userId), eq(boards.id, boardSelectedId)),
        with: {
          columns: {
            with: {
              tasks: {
                with: { subtasks: true },
              },
            },
          },
        },
      })

      return getSavedBoard
    } catch (error) {
      console.log(error, 'Algo ah salido mal')
    }
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:boardSelected'],
    suppressWarnings: true,
    logid: 'events',
  }
)

export const deleteCurrentBoard = async (id: string) => {
  await db.delete(boards).where(eq(boards.id, id))

  const { user } = await getCurrentUser()

  if (!user) return

  const userId = user.id as string

  const firstBoard = await db.query.boards.findFirst({
    where: eq(boards.userId, userId),
  })

  if (firstBoard) {
    await db
      .update(users)
      .set({
        boardSelected: firstBoard.id,
      })
      .where(eq(users.id, userId))
  } else {
    await db
      .update(users)
      .set({
        boardSelected: null,
      })
      .where(eq(users.id, userId))
  }

  revalidateTag('dashboard:boardSelected')
  revalidateTag('dashboard:boards')
}

export const setBoardSelected = async (id: string) => {
  const { user } = await getCurrentUser()

  if (!user) return null

  const userId = user?.id as string

  await db
    .update(users)
    .set({
      boardSelected: id,
    })
    .where(eq(users.id, userId))

  revalidateTag('dashboard:boardSelected')
}

export const getBoards = memoize(
  async (userId: string) => {
    const allBoards = await db
      .select({ id: boards.id, name: boards.name })
      .from(boards)
      .where(eq(boards.userId, userId))

    return allBoards ?? []
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:boards'],
    suppressWarnings: true,
    logid: 'events',
  }
)

export const createBoard = async (prevState: any, formData: FormData) => {
  const session = await auth()
  const { id }: any = session?.user
  const columnsJSON: any = formData.get('columns')
  const newColumns = JSON.parse(columnsJSON)

  try {
    const board = boardSchema.parse({
      name: formData.get('name'),
      columns: newColumns,
    })

    const newBoard = await db
      .insert(boards)
      .values({
        userId: id,
        name: board.name,
      })
      .returning({ id: boards.id })

    if (newColumns.length > 0) {
      await createColumns(board.columns, newBoard[0].id)
    }

    revalidateTag('dashboard:boards')
    revalidateTag('dashboard:boardSelected')

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
