import { db } from '@/db'
import { users, boards, tasks, subtasks } from '@/db/schema'
import { GQLContext } from '@/types'
import { getUserFromToken, signup, singin } from '@/utils/auth'
import { and, asc, desc, eq, or, sql } from 'drizzle-orm'
import { GraphQLError } from 'graphql'

const resolvers = {
  TaskStatus: {
    TODO: 'Todo',
    DOING: 'Doing',
    DONE: 'Done',
  },

  Query: {
    me: async (_: any, __: any, ctx: GQLContext) => {
      return ctx.user
    },
  },
  Mutation: {
    signin: async (
      _: any,
      { input }: { input: { email: string; password: string } }
    ) => {
      const data = await singin(input)

      if (!data || !data.token || !data.user) {
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })
      }

      return { ...data.user, token: data.token }
    },

    signup: async (
      _: any,
      {
        input,
      }: { input: { username: string; email: string; password: string } }
    ) => {
      const data = await signup(input)

      if (!data || !data.token || !data.user) {
        throw new GraphQLError('UNAUTHORIZED', { extensions: { code: 401 } })
      }

      return { ...data.user, token: data.token }
    },
  },
}

export default resolvers
