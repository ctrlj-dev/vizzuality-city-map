import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect from "/networks" to the root "/"
  if (request.nextUrl.pathname === '/networks') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow other requests to pass through
  return NextResponse.next();
}

export const config = {};
