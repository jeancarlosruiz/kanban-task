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
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
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
