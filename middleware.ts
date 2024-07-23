import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!request.cookies.has('auth')) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}
