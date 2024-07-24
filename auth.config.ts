import Credentials from 'next-auth/providers/credentials'
// import Github from 'next-auth/providers/github'
import type { NextAuthConfig } from 'next-auth'
import { getUserByEmail } from '@/db/user'
// import { getUserByEmail } from '@/actions'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'
import { comparePW, hashPW } from '@/utils/auth'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Zod credentials
        const email = credentials.email as string
        const password = credentials.password as string
        // const user = await db.query.users.findFirst({})

        console.log(email)
        // const user = await getUserByEmail(email)
        // if (!user || !user.password) return null
        // const password = credentials.password as string
        // const correctPassword = await comparePW(password, user.password)
        // if (correctPassword) return user
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
