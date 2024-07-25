import authConfig from './auth.config'
import NextAuth from 'next-auth'
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_REDIRECT,
} from '@/utils/routes'

const { auth } = NextAuth(authConfig)
//@ts-ignore
export default auth(async function middleware(req) {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = apiAuthPrefix.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  console.log('1')

  if (isApiAuthRoute) {
    console.log('2')
    return null
  }

  if (isAuthRoute) {
    console.log('3')

    if (isLoggedIn) {
      console.log('4')
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn) {
    console.log('5')
    return Response.redirect(new URL('/signin', nextUrl))
  }

  console.log('6')
  return null
})

// https://clerk.com/docs/references/nextjs/auth-middleware#usage
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
