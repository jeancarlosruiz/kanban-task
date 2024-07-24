import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/db'
// import { users } from '@/db/schema'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import authConfig from '@/auth.config'
import { singin } from './db/user'

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
  // providers: [
  //   Credentials({
  //     credentials: {
  //       email: {},
  //       password: {},
  //     },
  //     authorize: async (credentials) => {
  //       // logic to verify if user exists
  //       const user = await singin({
  //         email: credentials.email as string,
  //         password: credentials.password as string,
  //       })
  //       if (!user) {
  //         throw new Error('User not found')
  //       }
  //       return user
  //     },
  //   }),
  // ],
})
