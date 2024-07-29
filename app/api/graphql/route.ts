import { startServerAndCreateNextHandler } from '@as-integrations/next'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { ApolloServer } from '@apollo/server'
import typeDefs from './schema'
import resolvers from './resolvers'
import { NextRequest } from 'next/server'
import { gql } from '@urql/next'
import { getUserFromToken } from '@/utils/auth'
import { getToken } from '@/utils/token'

let plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins = [
    ApolloServerPluginLandingPageProductionDefault({
      embed: true,
      graphRef: 'myGraph@prod',
    }),
  ]
} else {
  plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const user = await getUserFromToken(req.headers.get('authorization') ?? '')
    const token = getToken()

    console.log({ token })

    return {
      req,
      user,
    }
  },
})

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
