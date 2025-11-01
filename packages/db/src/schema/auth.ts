import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

/**
 * Better Auth Schema for PostgreSQL with Drizzle ORM
 *
 * Core tables required by Better Auth:
 * - user: User accounts
 * - session: User sessions
 * - account: OAuth provider accounts
 * - verification: Email verification and OTP tokens
 */

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('emailVerified').notNull().default(false),
	image: text('image'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expiresAt').notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: text('userId')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const account = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: text('userId')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	idToken: text('idToken'),
	expiresAt: timestamp('expiresAt'),
	password: text('password'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expiresAt').notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export type AuthUser = typeof user.$inferSelect
export type NewAuthUser = typeof user.$inferInsert
export type AuthSession = typeof session.$inferSelect
export type NewAuthSession = typeof session.$inferInsert
export type AuthAccount = typeof account.$inferSelect
export type NewAuthAccount = typeof account.$inferInsert
export type AuthVerification = typeof verification.$inferSelect
export type NewAuthVerification = typeof verification.$inferInsert
