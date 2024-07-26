import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'
import { hashPW } from '@/utils/auth'

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    })

    return user
  } catch (error) {
    return null
  }
}

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
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) => {
  const hashedPW = await hashPW(password)

  const userExist = await getUserByEmail(email)

  if (userExist) {
    return { error: 'User already exist' }
  }

  console.log('first')
  await db.insert(users).values({ name, email, password: hashedPW }).returning({
    id: users.id,
    name: users.name,
    email: users.email,
    createdAt: users.createdAt,
  })

  return { success: 'User created' }
}
