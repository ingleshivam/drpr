
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}

// import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req: NextRequest) {
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//     const url = req.nextUrl.clone();

//     // If the token is not present and the request is not for the login page, redirect to login page
//     if (!token && url.pathname !== '/login') {
//         url.pathname = '/login';
//         return NextResponse.redirect(url);
//     }

//     return NextResponse.next();
// }
