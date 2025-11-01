import { sharedEnv } from '@canopy/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Create Neon HTTP client with validated DATABASE_URL
const sql = neon(sharedEnv.DATABASE_URL)

// Create Drizzle instance with schema
export const db = drizzle(sql, { schema })

// Export types
export type Database = typeof db
