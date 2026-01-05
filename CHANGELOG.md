# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [@ogxjs/core 0.3.0] - 2026-01-04 "Universal Fonts"

### Added
- `loadGoogleFont(fontName, weights)` - Load any Google Font by name from CDN
- `loadFontFromFile(path, options)` - Load custom local fonts (next/font pattern)
- `fontRegistry.registerGoogleFont(fontName, weights)` - Register Google Fonts globally
- `fontRegistry.registerFontFromFile(path, options)` - Register local fonts globally
- Universal font loading system with CDN-based defaults (Bunny Fonts)
- Support for any Google Font without bundling
- Support for custom local fonts in Next.js projects

### Changed
- **BREAKING**: Removed bundled Inter font files from package (~340KB reduction)
- **BREAKING**: Default font loading now uses CDN instead of bundled files
- Deprecated `loadInterFont()` (use `loadInterFromUrl()` instead, will be removed in v1.0.0)
- Deprecated `fontRegistry.registerInter()` (use `registerInterFromUrl()` instead, will be removed in v1.0.0)
- Updated `ogx()` and `ogxToSVG()` to use CDN-based font loading by default
- Updated build script to remove font file copying
- Package size reduced from ~620KB to ~576KB
- All tests updated to use CDN-based font loading

### Fixed
- Network dependency for font loading (now requires internet access on first render, fonts are cached)
- Migration path: Replace `loadInterFont()` with `loadInterFromUrl()` for CDN loading
- Migration path: Use `loadGoogleFont()` or `loadFontFromFile()` for custom fonts


## [@ogxjs/core 0.2.0-alpha.1] - 2026-01-02 "Turbo"

### Performance - Parser v2 "Turbo"
- O(1) Static Class Lookup: Replaced O(n) if/else chain with Map-based lookup tables (~170 classes)
- Modular Prefix Handlers: Refactored dynamic class parsing into modular handlers for better maintainability
- Multi-Level Caching: Added class-level and string-level caches for maximum performance
  - Class cache: Individual parsed classes are cached and reused across elements
  - String cache: Full `tw` strings are cached to skip redundant parsing
- Expected improvement: ~10x faster parsing for typical workloads

### ⚡ Performance - Cache System v2
- Fast Sync Hash: Replaced async SHA-256 with sync FNV-1a (~20x faster)
  - New `fnv1a()` and `fastHash()` functions
  - `hashObject()` for quick object hashing
- LRU Cache: Implemented proper LRU eviction with O(1) operations
  - Memory-bounded with configurable max size
  - Optional TTL support
  - Full statistics (hits, misses, hit rate)
- Snapshot Cache V2: Refactored image cache using new LRU implementation

### DX - Performance Tools
- Timer API: New timing utilities for measuring OGX performance
  - `Timer` class with start/end/measure methods
  - Global `timing` singleton for easy access
  - Formatted reports for debugging
- Quick Timing: `quickTime()` and `quickTimeSync()` for one-off measurements
- Benchmarking: `benchmark()` and `benchmarkSync()` for statistical measurements

### Added
- New exports: `cache/*`, `perf/*`, `tailwind/parser-v2`
- Extended `CSSProperties` type with `borderStyle: "dotted" | "double" | "none"`
- Presets - Universal Theme Support: Fixed `colorScheme` propagation and implementation across all presets
  - Unified light/dark theme behavior in `docs`, `blog`, `minimal`, and `social`
  - Added missing theme support to `minimal` and `social` presets
  - Improved light-mode contrast for secondary text and metadata
- Docs Preset - Enhanced Customization: Added `detailsOG` prop to toggle background grid and gradient effects

### Fixed
- Deprecated `parseTailwind` from `tailwind/parser.ts` (use v2 instead)
- `SnapshotCache.getHash()` is now sync (async version deprecated)
- Presets - Layout Refinement: Fixed title wrapping and alignment issues in `docs` preset
  - Added `flex-col` and `break-all` to `h1` for better word breaking
  - Expanded content container width to match headers/badges
- Core - Prop Propagation: Fixed bug in `ogx()` where `colorScheme` was not passed to preset functions


## [@ogxjs/core 0.1.2] - 2025-12-30

### Security
- Added automatic URL validation in `img()` helper to prevent SSRF attacks
  - Validates URLs by default, blocking private networks and metadata endpoints in production
  - Throws descriptive error for unsafe URLs
- Added `unsafe_img()` helper for explicit bypass cases (use with caution)

### Added
- Exported `unsafe_img()` function for advanced use cases

## [@ogxjs/next 0.1.1] - 2025-12-30

### Security
- Sanitized error messages in `ogxResponse()` to prevent information disclosure
  - Production environments receive generic error messages
  - Development environments still show detailed errors for debugging

### Added
- Added `@types/node` to devDependencies for proper TypeScript support

## [@ogxjs/react 0.1.2] - 2025-12-30

### Security
- Sanitized error logs in `toOGX()` function to prevent information disclosure
  - Detailed error messages (including stack traces) now only appear in development
  - Production environments receive no error logs to avoid exposing internal details

### Added
- Added `@types/node` to devDependencies for proper TypeScript support

### Added
- Performance benchmarks documentation
- Migration guide from `@vercel/og`
- Troubleshooting documentation

## [@ogxjs/core 0.1.1] - 2025-12-30

### Security
- Added URL validation to prevent SSRF attacks in production environments
  - Blocks localhost, private IPs (10.x, 172.16-31.x, 192.168.x), and metadata endpoints (169.254.169.254)
  - Allows localhost in development for local testing
  - Applied to `imgFromUrl()` and `loadFontFromUrl()`
- Added 10-second timeout for external font loading to prevent DoS
- Added validation for arbitrary Tailwind values
  - Limited to 100 characters to prevent DoS
  - Blocks potentially dangerous patterns (`javascript:`, `data:text/html`, `<script>`)
- Improved cache hash algorithm
  - Implemented SHA-256 via `getHashAsync()` for better collision resistance
  - Kept djb2 as sync fallback (deprecated)

### Added
- Exported `validateImageUrl()` function for public use
- Added `size` getter to `SnapshotCache` for monitoring

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
