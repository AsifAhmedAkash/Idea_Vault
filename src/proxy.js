import { auth } from '@/app/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }
}

export const config = {
    matcher: ['/my-ideas', '/add-idea', '/idea/:path', '/my-ideas', '/profile'],
}