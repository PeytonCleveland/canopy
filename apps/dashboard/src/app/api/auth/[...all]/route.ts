import { auth } from '@canopy/auth'
import { toNextJsHandler } from 'better-auth/next-js'

/**
 * Better Auth API route handler for Next.js App Router
 *
 * This catch-all route handles all Better Auth endpoints:
 * - POST /api/auth/sign-in/email - Initiate OTP sign-in
 * - POST /api/auth/sign-in/email/verify - Verify OTP code
 * - POST /api/auth/sign-out - Sign out user
 * - GET /api/auth/session - Get current session
 * - And other Better Auth endpoints
 */
export const { GET, POST } = toNextJsHandler(auth)
