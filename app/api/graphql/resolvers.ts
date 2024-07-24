import { GQLContext } from '@/types'

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
  // Mutation: {
  // },
}

export default resolvers
