import { db } from '@canopy/db'
import { email } from '@canopy/email'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { emailOTP } from 'better-auth/plugins'

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
	}),
	plugins: [
		emailOTP({
			async sendVerificationOTP({ email: emailAddress, otp, type }) {
				await email.sendOTP({
					email: emailAddress,
					otp,
					type,
				})
			},
			otpLength: 6,
			expiresIn: 300, // 5 minutes
			allowedAttempts: 3,
		}),
	],
})

export type Auth = typeof auth
