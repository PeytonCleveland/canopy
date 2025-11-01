import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@canopy/ui'
import Link from 'next/link'

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="max-w-4xl w-full space-y-8">
				<div className="text-center">
					<h1 className="text-6xl font-bold mb-4">Canopy</h1>
					<p className="text-2xl text-[rgb(var(--color-gray-600))] mb-8">
						Modern residential design platform
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>BIM-Grade Design</CardTitle>
							<CardDescription>
								Professional-grade modeling with real-time collaboration
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Cost Estimation</CardTitle>
							<CardDescription>
								Integrated estimating with live material pricing
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>AI-Powered</CardTitle>
							<CardDescription>
								Intelligent design suggestions and automated workflows
							</CardDescription>
						</CardHeader>
					</Card>
				</div>

				<Card className="text-center">
					<CardContent>
						<h2 className="text-2xl font-semibold mb-4">
							Ready to get started?
						</h2>
						<div className="flex gap-4 justify-center">
							<a href="http://localhost:3001">
								<Button>Open App</Button>
							</a>
							<Link href="/pricing">
								<Button variant="outline">View Pricing</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	)
}
