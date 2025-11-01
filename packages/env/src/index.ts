import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

/**
 * Shared environment variables used across multiple packages in the Canopy monorepo.
 *
 * This provides runtime validation and type-safe access to environment variables.
 * Individual apps can extend this schema with their own variables.
 *
 * @example
 * ```ts
 * import { createEnv } from '@t3-oss/env-core'
 * import { z } from 'zod'
 * import { sharedEnv } from '@canopy/env'
 *
 * export const env = createEnv({
 *   extends: [sharedEnv],
 *   client: {
 *     NEXT_PUBLIC_API_URL: z.string().url(),
 *   },
 *   runtimeEnv: process.env,
 * })
 * ```
 */
export const sharedEnv = createEnv({
	/**
	 * Server-side environment variables.
	 * These are never sent to the client.
	 */
	server: {
		DATABASE_URL: z
			.string()
			.url()
			.describe('Neon PostgreSQL connection string'),
		NODE_ENV: z
			.enum(['development', 'production', 'test'])
			.default('development')
			.describe('Node environment'),
	},

	/**
	 * Environment variables available on both client and server.
	 * Must be prefixed with NEXT_PUBLIC_ for Next.js or VITE_ for Vite.
	 */
	client: {},

	/**
	 * Shared environment variables that don't need client-side access.
	 */
	shared: {},

	/**
	 * Runtime environment variables object.
	 * For Next.js edge runtime, you can use `process.env`.
	 * For other environments, use the appropriate method to access env vars.
	 */
	runtimeEnv: process.env,

	/**
	 * Skip validation during build time in CI.
	 * This allows for proper env var validation in deployed environments.
	 */
	skipValidation: !!process.env.CI,

	/**
	 * Treat empty strings as undefined.
	 * Useful for optional environment variables.
	 */
	emptyStringAsUndefined: true,
})

/**
 * Type-safe access to shared environment variables.
 */
export type SharedEnv = typeof sharedEnv

/**
 * Export zod for convenience when extending the schema.
 */
export { z }
