import 'server-only'
import { users } from '@/db/schema'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { memoize } from 'nextjs-better-unstable-cache'

export const getCurrentUser = memoize(
  async (userId: string) => {
    try {
      const currentUser = await db.query.users.findFirst({
        where: eq(users.id, userId),
      })
      return currentUser
    } catch (error) {
      console.log(error)
    }
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:user'],
    suppressWarnings: true,
    logid: 'events',
  }
)
