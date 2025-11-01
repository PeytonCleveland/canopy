# @canopy/config

Shared TypeScript and tooling configurations for the Canopy monorepo.

## Available Configurations

### TypeScript Configs

- **tsconfig.base.json** - Base configuration for all TypeScript projects
  - Strict type checking enabled
  - ES2022 target and lib
  - Path aliases for all workspace packages
  - Module resolution set to "Bundler"

- **tsconfig.react.json** - Extends base config for React applications
  - JSX support with `preserve` mode
  - DOM types included
  - Next.js plugin configuration

- **tsconfig.node.json** - Extends base config for Node.js packages
  - Node.js types included
  - No DOM types

## Usage

In your package's `tsconfig.json`:

```json
{
  "extends": "@canopy/config/tsconfig.react.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Path Aliases

All workspace packages are pre-configured with path aliases:

- `@canopy/ui` → `packages/ui/src`
- `@canopy/db` → `packages/db/src`
- `@canopy/auth` → `packages/auth/src`
- `@canopy/bim` → `packages/bim/src`
- `@canopy/kernel` → `packages/kernel/pkg`
- `@canopy/renderer` → `packages/renderer/src`
- `@canopy/collab` → `packages/collab/src`
- `@canopy/takeoff` → `packages/takeoff/src`
- `@canopy/exports` → `packages/exports/src`
- `@canopy/api-client` → `packages/api-client/src`
