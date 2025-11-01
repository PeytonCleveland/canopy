import { sharedEnv } from '@canopy/env'
import { render } from '@react-email/render'
import { Resend } from 'resend'
import { OTPEmail } from './templates/otp-email'

/**
 * Resend email client instance
 */
export const resend = new Resend(sharedEnv.RESEND_API_KEY)

/**
 * Email sending utilities
 */
export const email = {
	/**
	 * Send OTP verification code
	 */
	sendOTP: async ({
		email,
		otp,
		type,
	}: {
		email: string
		otp: string
		type: 'sign-in' | 'email-verification' | 'forget-password'
	}) => {
		const html = await render(OTPEmail({ otp, type }))

		return resend.emails.send({
			from: sharedEnv.RESEND_FROM_EMAIL,
			to: email,
			subject:
				type === 'sign-in'
					? 'Sign in to Canopy'
					: type === 'email-verification'
						? 'Verify your email'
						: 'Reset your password',
			html,
		})
	},
}

/**
 * Export templates for development preview
 */
export * from './templates'
