import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'
import { getUserByEmail } from '@/db/user'
import { comparePW } from '@/utils/auth'
import { signInSchema } from '@/lib/zod'

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const isValid = signInSchema.safeParse(credentials)

        if (isValid.success) {
          const { email, password } = isValid.data
          const user = await getUserByEmail(email)
          if (!user || !user.password) return null
          const correctPassword = await comparePW(password, user.password)
          if (correctPassword) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
