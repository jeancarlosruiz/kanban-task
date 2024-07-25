import NextAuth from 'next-auth'
import { getUserById } from './db/user'
import { db } from '@/db'
import authConfig from '@/auth.config'
import { DrizzleAdapter } from '@auth/drizzle-adapter'

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as 'USER' | 'ADMIN'
      }

      // console.log({
      //   tokenSession: token,
      //   session,
      // })
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const user = await getUserById(token.sub)

      if (!user) return token

      token.role = user.role

      return token
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
