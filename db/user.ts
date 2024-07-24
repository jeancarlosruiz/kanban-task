import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'
import { comparePW, hashPW } from '@/utils/auth'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    return user
  } catch (error) {
    return null
  }
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

  //   const token = createTokenForUser(match.id)
  //   const { password: pw, ...user } = match

  //   console.log('aqui', user, token)

  //   return { user, token }
}

// export const signup = async ({
export const signupDB = async ({
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
  return
  //   const user = rows[0]
  //   const token = createTokenForUser(user.id)

  //   return { user, token }
}
