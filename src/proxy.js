import { auth } from '@/app/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'


export async function proxy(request) {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }


}


export const config = {
    matcher: ['/my-bookings', '/add-destination', '/destination/:path'],
}