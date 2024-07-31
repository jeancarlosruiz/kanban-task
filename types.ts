import NextAuth, { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'ADMIN' | 'USER'
}

declare module 'next-auth' {
  interface Session {
    id: string
    user: ExtendedUser
  }
}

export type GQLContext = {
  user?: { id: string; email: string; createdAt: string } | null
}
