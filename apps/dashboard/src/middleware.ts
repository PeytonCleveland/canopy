import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@canopy/auth'

/**
 * Middleware to protect routes and handle authentication
 *
 * Routes:
 * - /sign-in: Public route (redirects to home if authenticated)
 * - All other routes: Protected (redirects to /sign-in if not authenticated)
 */
export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Check if the request is for the sign-in page
	const isSignInPage = pathname === '/sign-in'

	// Get session
	const session = await auth.api.getSession({
		headers: request.headers,
	})

	// Redirect authenticated users away from sign-in page
	if (isSignInPage && session) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	// Redirect unauthenticated users to sign-in page
	if (!isSignInPage && !session) {
		const signInUrl = new URL('/sign-in', request.url)
		signInUrl.searchParams.set('callbackUrl', pathname)
		return NextResponse.redirect(signInUrl)
	}

	return NextResponse.next()
}

/**
 * Configure which routes should run through middleware
 */
export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - api/auth (auth API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public assets
		 */
		'/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
	],
}
