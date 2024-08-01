import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    console.log({ body })

    return new NextRequest(JSON.stringify({ data: 'Everything ok until now' }))
  } catch (error: any) {
    console.log({ error })
  }
}
