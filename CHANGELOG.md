# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Performance benchmarks documentation
- Migration guide from `@vercel/og`
- Troubleshooting documentation

## [@ogxjs/react 0.1.1] - 2025-12-29

### Fixed
- Replaced generic `Function` type with specific typed function `(props: unknown) => React.ReactNode`
- Improved type safety in `toOGX` function
- Resolves Biome linter warnings

## [0.1.0] - 2025-12-28

### Added
- Initial beta release
- `@ogxjs/core` - Core rendering engine with Tailwind JIT support
- `@ogxjs/next` - Next.js adapter with `ogxResponse()` helper
- `@ogxjs/react` - React adapter with JSX support and `tw` prop
- Built-in presets: `minimal`, `docs`, `blog`, `social`
- Fluent Builder API for programmatic image composition
- Built-in font registry with Inter font support
- PNG and SVG rendering (Node.js via Resvg, browser via Satori)
- Intelligent caching system for sub-millisecond repeat renders
- Full Tailwind CSS utility class support
- Multi-platform support (Node.js, Bun, Deno)
- Interactive Playground for live previews
- Comprehensive documentation site

### Performance
- Minimal preset: ~60ms average
- Docs preset: ~89ms average
- Social preset: ~690ms average (with complex gradients)
- Cached renders: ~0.7ms (85x faster than cold render)

[Unreleased]: https://github.com/carlosedujs/ogx/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/carlosedujs/ogx/releases/tag/v0.1.0
