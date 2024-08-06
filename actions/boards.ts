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
