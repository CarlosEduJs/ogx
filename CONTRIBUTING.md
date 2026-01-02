# Contributing to OGX

First off, thank you for considering contributing to OGX! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible using our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

### Suggesting Features

Feature suggestions are tracked as GitHub issues. When creating a feature request, use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Run `pnpm install` to install dependencies
3. Make your changes
4. Run `pnpm build` to ensure everything builds
5. Run `pnpm test` to run tests
6. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/)
7. Push to your fork and submit a pull request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/carlosedujs/ogx.git
cd ogx

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Start the docs site
pnpm dev --filter ogx-docs
```

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/). Examples:

- `feat(core): add new gradient parser`
- `fix(next): resolve serverExternalPackages issue`
- `docs: update installation guide`
- `chore: update dependencies`

## Project Structure

```
ogx/
├── apps/
│   └── ogx-docs/     # Documentation site + Playground
├── packages/
│   ├── core/         # @ogxjs/core - Main rendering engine
│   ├── next/         # @ogxjs/next - Next.js adapter
│   └── react/        # @ogxjs/react - React adapter
└── examples/         # Example projects
```

## Read [OGX_CODEMAP.md](OGX_CODEMAP.md) for more details on architecture and development patterns. This includes information on the Builder API, Tailwind processing, presets system, and font handling.

## Questions?

Feel free to open a [Discussion](https://github.com/carlosedujs/ogx/discussions) for any questions!
