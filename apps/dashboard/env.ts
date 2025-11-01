import { sharedEnv } from '@canopy/env'
import { createEnv } from '@t3-oss/env-nextjs'

/**
 * Environment variables for the dashboard application.
 *
 * Extends the shared environment schema with dashboard-specific variables.
 * All client-side variables must be prefixed with NEXT_PUBLIC_.
 *
 * Import this module at the top of your Next.js config or root layout
 * to ensure environment variables are validated at startup.
 */
export const env = createEnv({
	extends: [sharedEnv],

	/**
	 * Server-side environment variables for the dashboard app.
	 * Add any dashboard-specific server variables here.
	 */
	server: {
		// Example: ADMIN_API_KEY: z.string().min(32),
	},

	/**
	 * Client-side environment variables.
	 * These are embedded in the client bundle at build time.
	 * Must be prefixed with NEXT_PUBLIC_
	 */
	client: {
		// Example: NEXT_PUBLIC_DASHBOARD_API_URL: z.string().url(),
	},

	/**
	 * Specify which env vars from process.env should be used.
	 * This is required for client-side variables in Next.js.
	 */
	experimental__runtimeEnv: {
		// Map NEXT_PUBLIC_ vars here for client-side access
		// Example: NEXT_PUBLIC_DASHBOARD_API_URL: process.env.NEXT_PUBLIC_DASHBOARD_API_URL,
	},
})
