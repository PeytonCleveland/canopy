export default function DashboardHome() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">Canopy Dashboard</h1>
				<p className="text-xl text-gray-600 mb-8">
					Welcome to your design workspace
				</p>
				<div className="text-sm text-gray-500">
					<p className="mb-2">Auth and project management coming soon...</p>
					<p className="text-xs">
						API will be available at{' '}
						<code className="bg-gray-100 px-2 py-1 rounded">
							http://localhost:8787
						</code>
					</p>
				</div>
			</div>
		</main>
	)
}
