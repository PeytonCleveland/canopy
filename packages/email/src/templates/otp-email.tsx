import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Text,
} from '@react-email/components'

interface OTPEmailProps {
	otp: string
	type: 'sign-in' | 'email-verification' | 'forget-password'
}

const typeConfig = {
	'sign-in': {
		title: 'Sign in to Canopy',
		preview: 'Your sign-in verification code',
		description: 'Use this code to sign in to your Canopy account.',
	},
	'email-verification': {
		title: 'Verify your email',
		preview: 'Verify your email address',
		description: 'Use this code to verify your email address.',
	},
	'forget-password': {
		title: 'Reset your password',
		preview: 'Your password reset code',
		description: 'Use this code to reset your password.',
	},
}

export function OTPEmail({ otp, type }: OTPEmailProps) {
	const config = typeConfig[type]

	return (
		<Html>
			<Head />
			<Preview>{config.preview}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>{config.title}</Heading>
					<Text style={text}>{config.description}</Text>

					<Section style={codeContainer}>
						<Text style={code}>{otp}</Text>
					</Section>

					<Text style={text}>
						This code will expire in <strong>5 minutes</strong>.
					</Text>

					<Text style={footer}>
						If you didn't request this code, you can safely ignore this email.
					</Text>
				</Container>
			</Body>
		</Html>
	)
}

const main = {
	backgroundColor: '#f6f9fc',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
	backgroundColor: '#ffffff',
	margin: '0 auto',
	padding: '20px 0 48px',
	marginBottom: '64px',
	borderRadius: '8px',
	maxWidth: '600px',
}

const h1 = {
	color: '#333',
	fontSize: '24px',
	fontWeight: 'bold',
	margin: '40px 0',
	padding: '0 40px',
}

const text = {
	color: '#666',
	fontSize: '16px',
	lineHeight: '26px',
	margin: '16px 0',
	padding: '0 40px',
}

const codeContainer = {
	background: '#f5f5f5',
	borderRadius: '8px',
	margin: '32px 40px',
	padding: '24px',
	textAlign: 'center' as const,
}

const code = {
	color: '#333',
	fontSize: '36px',
	fontWeight: 'bold',
	letterSpacing: '8px',
	margin: '0',
}

const footer = {
	color: '#999',
	fontSize: '12px',
	lineHeight: '20px',
	margin: '32px 0 0',
	padding: '0 40px',
}

OTPEmail.PreviewProps = {
	otp: '123456',
	type: 'sign-in',
} as OTPEmailProps

export default OTPEmail
