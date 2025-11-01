'use client'

import { authClient } from '@canopy/auth/client'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@canopy/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type SignInStep = 'email' | 'verify'

export default function SignInPage() {
	const router = useRouter()
	const [step, setStep] = useState<SignInStep>('email')
	const [email, setEmail] = useState('')
	const [otp, setOtp] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSendOTP = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			await authClient.signIn.email({
				email,
				callbackURL: '/dashboard',
			})
			setStep('verify')
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to send verification code')
		} finally {
			setLoading(false)
		}
	}

	const handleVerifyOTP = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			await authClient.signIn.emailOtp.verifyCode({
				email,
				otp,
			})
			router.push('/')
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Invalid verification code')
		} finally {
			setLoading(false)
		}
	}

	const handleBack = () => {
		setStep('email')
		setOtp('')
		setError('')
	}

	return (
		<main className="flex min-h-screen items-center justify-center p-4 bg-[rgb(var(--color-gray-50))] dark:bg-[rgb(var(--color-gray-950))]">
			<div className="w-full max-w-md">
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-2xl">Sign in to Canopy</CardTitle>
						<CardDescription>
							{step === 'email'
								? 'Enter your email to receive a verification code'
								: 'Enter the 6-digit code sent to your email'}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{step === 'email' ? (
							<form onSubmit={handleSendOTP} className="space-y-4">
								<Input
									label="Email address"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="you@example.com"
									required
									autoFocus
									errorMessage={error}
								/>
								<Button
									type="submit"
									className="w-full"
									isDisabled={loading || !email}
								>
									{loading ? 'Sending...' : 'Continue'}
								</Button>
							</form>
						) : (
							<form onSubmit={handleVerifyOTP} className="space-y-4">
								<div className="text-sm text-center text-[rgb(var(--color-gray-600))] dark:text-[rgb(var(--color-gray-400))] mb-4">
									Code sent to <strong>{email}</strong>
								</div>
								<Input
									label="Verification code"
									type="text"
									value={otp}
									onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
									placeholder="000000"
									maxLength={6}
									required
									autoFocus
									errorMessage={error}
									className="text-center text-2xl tracking-widest font-mono"
								/>
								<div className="space-y-2">
									<Button
										type="submit"
										className="w-full"
										isDisabled={loading || otp.length !== 6}
									>
										{loading ? 'Verifying...' : 'Verify'}
									</Button>
									<Button
										type="button"
										variant="ghost"
										className="w-full"
										onPress={handleBack}
										isDisabled={loading}
									>
										Use a different email
									</Button>
								</div>
							</form>
						)}
					</CardContent>
				</Card>
			</div>
		</main>
	)
}
