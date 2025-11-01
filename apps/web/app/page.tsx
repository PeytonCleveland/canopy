import Link from 'next/link'

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="text-center">
				<h1 className="text-6xl font-bold mb-4">Canopy</h1>
				<p className="text-2xl text-gray-600 mb-8">
					Modern residential design platform
				</p>
				<div className="flex gap-4 justify-center">
					<a
						href="http://localhost:3001"
						className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
					>
						Open App
					</a>
					<Link
						href="/pricing"
						className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
					>
						Pricing
					</Link>
				</div>
			</div>
		</main>
	)
}
