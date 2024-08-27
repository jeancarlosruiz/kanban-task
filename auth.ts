import NextAuth from 'next-auth'
import { getUserById } from './db/user'
import { db } from '@/db'
import authConfig from '@/auth.config'
import { DrizzleAdapter } from '@auth/drizzle-adapter'

export const { handlers, signIn, signOut, auth } = NextAuth({
  events: {
    async linkAccount({ user }) {
      console.log(user)
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as 'USER' | 'ADMIN'
      }

      if (token.boardSelected && session.user) {
        session.user.boardSelected = token.boardSelected
      }

      if (session.user) {
        session.user.name = token.name
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const user = await getUserById(token.sub)

      if (!user) return token

      token.role = user.role
      token.boardSelected = user.boardSelected
      token.name = user.name

      return token
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
