'use server'
import { boards, columns } from '@/db/schema'
import { db } from '@/db'
import { auth } from '@/auth'
import { and, eq } from 'drizzle-orm'
import { boardSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { cookies } from 'next/headers'
import Cookies from 'js-cookie'

export const boardSelected = async () => {
  try {
    //todo: Hacer un route en api para setear la cookie.
    const session = await auth()
    const { id }: any = session?.user
    const cookiesStore = cookies()
    const savedBoard = cookiesStore.get('board-selected')
    // const savedBoard = Cookies.get('authjs.session-token')

    console.log(savedBoard)

    if (!savedBoard) {
      console.log(savedBoard)
      console.log('aqui')

      const firstBoard = await db.query.boards.findFirst({
        where: eq(boards.userId, id),
      })

      console.log(firstBoard)

      const boardId = firstBoard?.id as string
      console.log(boardId)

      const expires = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
      console.log(expires)

      Cookies.set('board-selected', boardId)
      // cookies().set('bs', 'f2e75f1e-b099-45b0-965d-1d7ef954b301')

      return firstBoard
    }

    const getSavedBoard = await db.query.boards.findFirst({
      where: and(eq(boards.userId, id), eq(boards.id, savedBoard?.value)),
    })

    console.log({ getSavedBoard })

    //todo: Si se elimina un board cambiar la cookie y guardar la primera en la lista
    return getSavedBoard
  } catch (error) {
    console.log(error, 'Algo ah salido mal')
  }
}

export const getBoardSelected = async (id: string) => {}

export const getBoards = async () => {
  const session = await auth()
  const { id }: any = session?.user

  const allBoards = await db.query.boards.findMany({
    where: eq(boards.userId, id),
  })

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
