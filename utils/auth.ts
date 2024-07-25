import jwt from 'jsonwebtoken'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { users } from '@/db/schema'

const SECRET = process.env.SECRET_KEY!

export const hashPW = async (password: any) => {
  return await bcrypt.hash(password, 10)
}

export const comparePW = async (password: string, hashedPW: string) => {
  return await bcrypt.compare(password, hashedPW)
}

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, SECRET)
  return token
}

export const getUserFromToken = async (header?: string) => {
  if (!header) {
    return null
  }

  const token = (header.split(`Bearer`)[1] ?? '').trim()
  let id: string

  try {
    const user = jwt.verify(token, SECRET) as { id: string }
    id = user.id
  } catch (e) {
    console.error('invalid jwt', e)
    return null
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      id: true,
      username: true,
      email: true,
    },
  })

  return user
}
