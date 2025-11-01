# Canopy

Modern residential design platform built with cutting-edge web technologies.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Desktop**: [Tauri 2.0](https://v2.tauri.app/) with Rust
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [React Aria Components](https://react-spectrum.adobe.com/react-aria/index.html)
- **Database**: [Neon PostgreSQL](https://neon.tech/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Environment**: [t3-env](https://env.t3.gg/) with [Zod v4](https://zod.dev/)
- **Monorepo**: [Turborepo 2.6](https://turbo.build/repo) with [pnpm workspaces](https://pnpm.io/workspaces)
- **Linting**: [Biome](https://biomejs.dev/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) with [lint-staged](https://github.com/lint-staged/lint-staged)

## Project Structure

```
canopy/
├── apps/
│   ├── web/              # Public marketing website (Next.js)
│   ├── dashboard/        # Design dashboard application (Next.js)
│   └── desktop/          # Desktop application wrapper (Tauri)
│
├── packages/
│   ├── @canopy/config    # Shared configuration (TypeScript, Biome)
│   ├── @canopy/db        # Database layer (Drizzle ORM + Neon)
│   ├── @canopy/env       # Environment variables (t3-env + Zod)
│   └── @canopy/ui        # Shared UI components (React Aria + Tailwind)
│
└── ...config files
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v24.11.0 or higher (LTS "Krypton")
- **pnpm**: v10.20.0 or higher
- **Rust**: Latest stable (for Tauri desktop app)
- **Neon Account**: For PostgreSQL database ([sign up](https://console.neon.tech))

### Quick Setup

```bash
# Install Node.js v24.11.0 using nvm
nvm install 24.11.0
nvm use

# Install pnpm globally
npm install -g pnpm@10.20.0

# Install Rust (for desktop app)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/canopy.git
cd canopy
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Neon database connection string:

```bash
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/canopy?sslmode=require
```

Get your connection string from [Neon Console](https://console.neon.tech).

### 4. Database Setup

Push the database schema to Neon:

```bash
pnpm db:push
```

### 5. Start Development

Choose your development environment:

```bash
# Start all apps (web, dashboard, desktop)
pnpm dev

# Or start individual apps:
pnpm dev:web        # http://localhost:3000
pnpm dev:dashboard  # http://localhost:3001
pnpm dev:desktop    # Tauri desktop app
```

## Development Scripts

### Root Commands

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm dev:web          # Start web app only
pnpm dev:dashboard    # Start dashboard app only
pnpm dev:desktop      # Start desktop app only

# Building
pnpm build            # Build all apps
pnpm build:web        # Build web app
pnpm build:dashboard  # Build dashboard app
pnpm build:desktop    # Build desktop app

# Database
pnpm db:generate      # Generate database migrations
pnpm db:migrate       # Run database migrations
pnpm db:push          # Push schema changes (development)
pnpm db:studio        # Open Drizzle Studio (visual database explorer)
pnpm db:check         # Check for schema issues

# Code Quality
pnpm lint             # Lint all packages
pnpm typecheck        # Type check all packages
pnpm test             # Run all tests
pnpm format           # Format all files with Biome
pnpm format:check     # Check formatting
pnpm check            # Run Biome checks
pnpm check:fix        # Fix Biome issues

# Cleanup
pnpm clean            # Clean build artifacts and node_modules
```

## Environment Variables

This project uses [t3-env](https://env.t3.gg/) for type-safe environment variables with runtime validation.

### Shared Variables (Root `.env`)

- `DATABASE_URL` - Neon PostgreSQL connection string
- `NODE_ENV` - Environment mode (development, production, test)

### App-Specific Variables

Apps can extend the shared environment schema:

- **Web**: `apps/web/env.ts`
- **Dashboard**: `apps/dashboard/env.ts`

See [@canopy/env README](./packages/env/README.md) for more details.

## Database

This project uses [Drizzle ORM](https://orm.drizzle.team/) with [Neon PostgreSQL](https://neon.tech/) (serverless).

### Development Workflow

1. **Modify Schema**: Edit files in `packages/db/src/schema/`
2. **Push Changes**: Run `pnpm db:push` (development only)
3. **Generate Migrations**: Run `pnpm db:generate` (production)
4. **Apply Migrations**: Run `pnpm db:migrate` (production)

### Database Studio

Launch Drizzle Studio for a visual interface:

```bash
pnpm db:studio
```

See [@canopy/db README](./packages/db/README.md) for more details.

## Desktop App

The desktop application wraps the dashboard app using [Tauri 2.0](https://v2.tauri.app/).

### Requirements

- Rust toolchain (stable)
- Platform-specific dependencies:
  - **macOS**: Xcode Command Line Tools
  - **Linux**: See [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/)
  - **Windows**: Microsoft C++ Build Tools

### Development

```bash
pnpm dev:desktop
```

### Building

```bash
pnpm build:desktop
```

The built application will be in `apps/desktop/src-tauri/target/release/`.

## Packages

### [@canopy/config](./packages/config/)

Shared configuration for TypeScript and Biome across all packages.

### [@canopy/db](./packages/db/)

Database layer with Drizzle ORM and Neon PostgreSQL.

### [@canopy/env](./packages/env/)

Type-safe environment variables with runtime validation using t3-env and Zod.

### [@canopy/ui](./packages/ui/)

Shared UI components built with React Aria Components and Tailwind CSS.

## Code Quality

### Pre-commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) with [lint-staged](https://github.com/lint-staged/lint-staged) to automatically:

- Format code with Biome
- Lint TypeScript/JavaScript files
- Type check staged files

Hooks run automatically on `git commit`. To bypass (not recommended):

```bash
git commit --no-verify
```

### Biome Configuration

[Biome](https://biomejs.dev/) handles both linting and formatting. Configuration is in `biome.json`.

```bash
# Check for issues
pnpm check

# Auto-fix issues
pnpm check:fix

# Format code
pnpm format
```

## Monorepo Architecture

This project uses [Turborepo](https://turbo.build/repo) for task orchestration and caching.

### Key Features

- **Task Caching**: Turborepo caches build outputs for faster rebuilds
- **Parallel Execution**: Tasks run in parallel when possible
- **Dependency Graph**: Automatic task ordering based on package dependencies
- **Remote Caching**: Optional team-wide caching (not configured)

### Adding New Packages

1. Create package directory: `packages/your-package/`
2. Add `package.json` with name `@canopy/your-package`
3. Add to workspace in root `pnpm-workspace.yaml` (if needed)
4. Install dependencies: `pnpm install`

### Adding New Apps

1. Create app directory: `apps/your-app/`
2. Add `package.json` with appropriate configuration
3. Add to workspace in root `pnpm-workspace.yaml` (if needed)
4. Install dependencies: `pnpm install`

## Contributing

### Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Ensure quality checks pass: `pnpm check && pnpm typecheck && pnpm test`
4. Commit your changes (pre-commit hooks will run)
5. Push and create a pull request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring
- `test:` - Test changes
- `style:` - Code style changes (formatting, etc.)

### Code Style

- **Indentation**: Tabs
- **Quotes**: Single quotes
- **Semicolons**: Not required
- **Line Length**: 100 characters
- **Trailing Commas**: ES5

Biome will automatically format your code on commit.

## Troubleshooting

### Database Connection Issues

```bash
# Verify DATABASE_URL is set
echo $DATABASE_URL

# Test database connection
pnpm db:studio
```

### Desktop App Build Issues

```bash
# Verify Rust installation
rustc --version
cargo --version

# Ensure cargo is in PATH
echo $PATH | grep cargo
```

### Type Errors

```bash
# Clean and reinstall dependencies
pnpm clean
pnpm install

# Rebuild packages
pnpm build
```

### Port Already in Use

If ports 3000 or 3001 are in use:

```bash
# Find process using port
lsof -i :3000
lsof -i :3001

# Kill process
kill -9 <PID>
```

## Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tauri Documentation](https://v2.tauri.app/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [t3-env Documentation](https://env.t3.gg/)
- [Biome Documentation](https://biomejs.dev/)

## License

[MIT](./LICENSE) or [Apache-2.0](./LICENSE-APACHE) - Choose whichever works for your project.
