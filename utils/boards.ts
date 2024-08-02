import 'server-only'
import { boards, columns, users } from '@/db/schema'
import { db } from '@/db'
import { eq, and } from 'drizzle-orm'
import { memoize } from 'nextjs-better-unstable-cache'

export const getBoardSelected = memoize(
  async (userId: string, boardSelectedId: string) => {
    try {
      if (!boardSelectedId) {
        const firstBoard = await db.query.boards.findFirst({
          where: eq(boards.userId, userId),
        })

        if (firstBoard) {
          const boardId = firstBoard?.id as string

          await db
            .update(users)
            .set({
              boardSelected: boardId,
            })
            .where(eq(users.id, userId))

          return firstBoard
        }

        return {}
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

export const getBoards = memoize(
  async (userId: string) => {
    try {
      const allBoards = await db
        .select({ id: boards.id, name: boards.name })
        .from(boards)
        .where(eq(boards.userId, userId))

      return allBoards ?? []
    } catch (error) {
      console.log(error, '')
    }
  },
  {
    persist: true,
    revalidateTags: (userId) => ['dashboard:boards', userId],
    suppressWarnings: true,
    log: ['dedupe', 'verbose'],
    logid: 'Get boards',
  }
)
