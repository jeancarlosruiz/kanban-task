import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { singin } from '@/utils/auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // logic to verify if user exists
        const user = await singin({
          email: credentials.email as string,
          password: credentials.password as string,
        })

        if (!user) {
          throw new Error('User not found')
        }

        return user
      },
    }),
  ],
})
