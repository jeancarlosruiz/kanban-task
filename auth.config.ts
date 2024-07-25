import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import { getUserByEmail } from '@/db/user'
import { comparePW } from '@/utils/auth'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Zod credentials
        const email = credentials.email as string
        const password = credentials.password as string
        const user = await getUserByEmail(email)
        if (!user || !user.password) return null
        const correctPassword = await comparePW(password, user.password)
        if (correctPassword) return user
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
