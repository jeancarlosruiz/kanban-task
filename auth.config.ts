import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import { getUserByEmail } from '@/db/user'
import { comparePW } from '@/utils/auth'
import { signInSchema } from '@/lib/zod'
import { ZodError } from 'zod'

export default {
  providers: [
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
