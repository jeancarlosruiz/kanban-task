import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'
import { hashPW } from '@/utils/auth'

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

export const register = async ({
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

  return rows[0]
}
