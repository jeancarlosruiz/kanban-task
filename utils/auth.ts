import jwt from 'jsonwebtoken'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'
import { comparePW, hashPW } from '@/actions'

const SECRET = process.env.SECRET_KEY!

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

  console.log(token)

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

export const singin = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const match = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  console.log({ match })

  if (!match) return null

  console.log('hey', match.password)
  // const hash = await hashPW(password)

  const correctPW = await comparePW(password, match.password)

  console.log({ correctPW })

  if (!correctPW) return null

  const token = createTokenForUser(match.id)
  const { password: pw, ...user } = match

  console.log('aqui', user, token)

  return { user, token }
}

export const signup = async ({
  username,
  email,
  password,
}: {
  username: string
  email: string
  password: string
}) => {
  const hashedPW = await hashPW(password)
  const rows = await db
    .insert(users)
    .values({ username, email, password: hashedPW })
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
      createdAt: users.createdAt,
    })

  const user = rows[0]
  const token = createTokenForUser(user.id)

  return { user, token }
}
