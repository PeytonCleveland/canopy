import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
	throw new Error(
		'DATABASE_URL environment variable is required. Get your connection string from https://console.neon.tech'
	)
}

// Create Neon HTTP client
const sql = neon(process.env.DATABASE_URL)

// Create Drizzle instance with schema
export const db = drizzle(sql, { schema })

// Export types
export type Database = typeof db
