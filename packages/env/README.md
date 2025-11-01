# @canopy/env

Type-safe environment variables with runtime validation using [t3-env](https://env.t3.gg/) and [Zod](https://zod.dev/).

## Features

- **Runtime Validation**: Catches missing or invalid environment variables at startup
- **Type Safety**: Full TypeScript autocomplete and type inference
- **Monorepo-Friendly**: Share common env vars, extend for app-specific needs
- **Framework Support**: Works with Next.js, Node.js, and other JavaScript runtimes

## Usage

### Shared Environment Variables

The `@canopy/env` package exports a `sharedEnv` object that contains environment variables used across multiple packages:

```typescript
import { sharedEnv } from '@canopy/env'

// Type-safe access to validated environment variables
const dbUrl = sharedEnv.DATABASE_URL
const nodeEnv = sharedEnv.NODE_ENV
```

### Extending for App-Specific Variables

Apps can extend the shared schema with their own variables:

```typescript
// apps/web/env.ts
import { createEnv } from '@t3-oss/env-nextjs'
import { sharedEnv, z } from '@canopy/env'

export const env = createEnv({
	extends: [sharedEnv],

	server: {
		// Server-only variables
		API_SECRET: z.string().min(32),
	},

	client: {
		// Client-side variables (must be prefixed with NEXT_PUBLIC_)
		NEXT_PUBLIC_API_URL: z.string().url(),
	},

	experimental__runtimeEnv: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
})
```

### Validation on Startup

Import your env module at the top of your app's entry point to ensure validation happens at startup:

```typescript
// Next.js: next.config.ts or app/layout.tsx
import './env'

// Node.js: index.ts
import './env'
```

## Shared Environment Variables

Current shared environment variables:

- `DATABASE_URL` (string, URL) - Neon PostgreSQL connection string
- `NODE_ENV` (enum: 'development' | 'production' | 'test') - Node environment

## Adding New Shared Variables

To add a new shared environment variable:

1. Update `packages/env/src/index.ts`
2. Add the variable to the `server` or `client` object
3. Document it in this README

```typescript
export const sharedEnv = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
		// Add new shared variables here
		NEW_SHARED_VAR: z.string(),
	},
	// ...
})
```

## CI/CD

Validation is automatically skipped in CI environments (when `CI=true`) to allow for proper validation in deployed environments.

## Learn More

- [t3-env Documentation](https://env.t3.gg/)
- [Zod Documentation](https://zod.dev/)
