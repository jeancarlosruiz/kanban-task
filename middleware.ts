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
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL('/signin', nextUrl))
  }

  if (nextUrl.pathname === '/' && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
  }

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
