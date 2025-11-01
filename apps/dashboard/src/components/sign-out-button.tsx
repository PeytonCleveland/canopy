'use client'

import { authClient } from '@canopy/auth/client'
import { Button } from '@canopy/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SignOutButton() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const handleSignOut = async () => {
		setLoading(true)
		try {
			await authClient.signOut()
			router.push('/sign-in')
		} catch (error) {
			console.error('Failed to sign out:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Button
			variant="outline"
			size="sm"
			onPress={handleSignOut}
			isDisabled={loading}
		>
			{loading ? 'Signing out...' : 'Sign out'}
		</Button>
	)
}
