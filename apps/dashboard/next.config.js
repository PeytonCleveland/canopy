/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: [
		'@canopy/ui',
		'@canopy/bim',
		'@canopy/api-client',
		'@canopy/auth',
	],
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
	turbopack: {},
	webpack: (config) => {
		// WASM support for modeling kernel
		config.experiments = {
			...config.experiments,
			asyncWebAssembly: true,
			layers: true,
		}

		return config
	},
}

module.exports = nextConfig
