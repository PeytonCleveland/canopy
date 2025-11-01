import { auth } from '@canopy/auth'
import { headers } from 'next/headers'
import type { AuthSession } from '@canopy/db'

/**
 * Get the current session from the request
 *
 * This function should be called from Server Components or Server Actions
 * to retrieve the authenticated user's session.
 *
 * @returns The current session or null if not authenticated
 */
export async function getSession(): Promise<{ session: AuthSession; user: any } | null> {
	try {
		const headersList = await headers()
		const session = await auth.api.getSession({
			headers: headersList,
		})

		return session
	} catch (error) {
		console.error('Failed to get session:', error)
		return null
	}
}

/**
 * Require authentication for a page
 *
 * This function should be called at the top of Server Components that require authentication.
 * It will redirect to the sign-in page if the user is not authenticated.
 *
 * @returns The current session
 * @throws Redirects to /sign-in if not authenticated
 */
export async function requireAuth(): Promise<{ session: AuthSession; user: any }> {
	const session = await getSession()

	if (!session) {
		const { redirect } = await import('next/navigation')
		redirect('/sign-in')
	}

	return session
}

/**
 * Check if the user is authenticated
 *
 * @returns true if the user is authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
	const session = await getSession()
	return !!session
}
