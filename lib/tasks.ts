import 'server-only'
import { tasks } from '@/db/schema'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { memoize } from 'nextjs-better-unstable-cache'

export const getTasks = memoize(
  async (columnId: string) => {
    try {
      return await db.query.tasks.findMany({
        where: eq(tasks.columnId, columnId),
        with: {
          subtasks: true,
        },
      })
    } catch (error) {
      console.log(error)
    }
  },
  {
    persist: true,
    revalidateTags: () => [`dashboard:tasks`],
    suppressWarnings: true,
    // Enable logs to see timer or whether it triggers ODR or BR
    log: ['dedupe', 'datacache', 'verbose'],
    logid: 'tasks',
  }
)
