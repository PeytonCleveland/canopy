import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@canopy/ui'
import { requireAuth } from '../lib/auth'
import { SignOutButton } from '../components/sign-out-button'

export default async function DashboardHome() {
	const { user } = await requireAuth()

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-8">
			<div className="max-w-6xl w-full space-y-8">
				<div className="text-center">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-4xl font-bold flex-1">Canopy Dashboard</h1>
						<SignOutButton />
					</div>
					<p className="text-xl text-[rgb(var(--color-gray-600))] mb-2">
						Welcome back, {user.name || user.email}!
					</p>
					<p className="text-sm text-[rgb(var(--color-gray-500))] mb-8">
						Your design workspace
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Projects</CardTitle>
							<CardDescription>
								Manage your residential design projects
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-[rgb(var(--color-gray-600))]">
								No projects yet. Create your first project to get started.
							</p>
						</CardContent>
						<CardFooter>
							<Button>Create Project</Button>
							<Button variant="outline">Import</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Team</CardTitle>
							<CardDescription>
								Collaborate with your team in real-time
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-[rgb(var(--color-gray-600))]">
								Invite team members to start collaborating.
							</p>
						</CardContent>
						<CardFooter>
							<Button variant="secondary">Invite Team</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>API Status</CardTitle>
							<CardDescription>Backend service connection</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-[rgb(var(--color-gray-600))] mb-2">
								API will be available at:
							</p>
							<code className="text-xs bg-[rgb(var(--color-gray-100))] px-3 py-2 rounded-[var(--radius-md)] block">
								http://localhost:8787
							</code>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
							<CardDescription>Common tasks and shortcuts</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<Button variant="ghost" className="w-full justify-start">
								View Documentation
							</Button>
							<Button variant="ghost" className="w-full justify-start">
								Keyboard Shortcuts
							</Button>
							<Button variant="ghost" className="w-full justify-start">
								Help & Support
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	)
}
