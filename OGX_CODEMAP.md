# OGX - Code Map Insctructions

## Project Overview

OGX is a high-performance Open Graph image generator with Tailwind CSS support. The rendering pipeline flows: **Builder API → OGX Element Tree → Tailwind Parser → Satori (SVG) → resvg-js (PNG)**.

## Monorepo Structure

```
packages/
├── core/          # @ogxjs/core - Rendering engine, builder, presets, Tailwind parser
├── next/          # @ogxjs/next - Next.js Route Handler adapter (ogxResponse)
├── react/         # @ogxjs/react - JSX components (Box, Stack, Row, etc.)
apps/
└── ogx-docs/      # Documentation site (Fumadocs + Next.js)
examples/          # Reference implementations
```

## Key Development Commands

```bash
pnpm install           # Install all workspace dependencies
pnpm build             # Build all packages (Turborepo)
pnpm dev               # Watch mode for all packages
pnpm test              # Run Vitest tests
pnpm bench             # Run benchmarks (packages/core)
pnpm check             # Biome lint + format
```

## Architecture Patterns

### Builder API (packages/core/src/builder.ts)
All layout elements use functional builders that return `OGXElement` objects:
```typescript
// Correct: Use builder functions, not JSX in core
stack("w-full h-full bg-zinc-950", [
  h1("text-6xl font-bold", "Title"),
  p("text-xl opacity-60", "Subtitle"),
])
```

### Tailwind Processing
- Tailwind classes are parsed at render-time via `parseTailwind()` → inline CSS styles
- NOT a PostCSS build step - it's a runtime parser supporting common utilities
- Arbitrary values work: `bg-[#ff0000]`, `text-[32px]`
- See [packages/core/src/tailwind/parser.ts](packages/core/src/tailwind/parser.ts) for supported classes

### Presets System (packages/core/src/presets/)
Presets are factory functions returning `OGXElement`. Each preset accepts typed props:
- `minimal` - Simple text-only cards
- `blog` - Article headers with metadata
- `docs` - Documentation page cards
- `social` - Full social media cards with branding

### Font Handling
```typescript
// Fonts resolve in order: fontRegistry > explicit config > auto-load Inter
await fontRegistry.registerInterFromUrl([400, 700]);  // CDN loading
const inter = await loadInterFont(400);              // Bundled fallback
```

## Code Conventions

- **Formatting**: Biome with tabs, double quotes (`biome.json`)
- **Commits**: Conventional Commits (`feat(core):`, `fix(next):`, `docs:`)
- **ESM Only**: All packages are `"type": "module"`
- **TypeScript**: Strict mode, no explicit `any` warnings disabled
- **Tests**: Vitest with `describe`/`it` blocks, Portuguese test descriptions are acceptable

## Testing Patterns

```typescript
// Unit tests: packages/core/src/__tests__/unit/
describe("Builder API", () => {
  it("deve criar um elemento básico com h()", () => {
    const el = h("div", { tw: "bg-red-500" });
    expect(el.type).toBe("div");
  });
});
```

## When implementing features
- Follow existing patterns in `packages/core/src/`
- Update types in `packages/core/src/types.ts`
- Add tests in `packages/core/src/__tests__/`unit/ or integration/
- Update package.json version in `packages/core/package.json`
- Build core with `pnpm build` to ensure no errors
- If new dependencies are added, run `pnpm install` at the root

## Export Structure

Each package has specific subpath exports:
- `@ogxjs/core` - Main (builder, presets, fonts)
- `@ogxjs/core/svg` - Browser-safe SVG rendering
- `@ogxjs/core/png` - Node.js PNG rendering (resvg-js)
- `@ogxjs/react/jsx` - TypeScript JSX types

## Common Pitfalls

1. **Don't import PNG render in browser** - `render()` requires Node.js (`@resvg/resvg-js`)
2. **`tw` prop is arrays or strings** - Builder normalizes to flat arrays internally
3. **Satori limitations** - No CSS Grid, limited flexbox (use `row`/`stack` helpers)
4. **Image URLs validated** - Use `unsafe_img()` only for trusted internal URLs

## Adding a New Preset

1. Create `packages/core/src/presets/{name}.ts`
2. Export typed props interface and preset function
3. Register in `packages/core/src/presets/index.ts`
4. Add to `presets` object in `packages/core/src/types.ts`

## Benchmarking
- Benchmarks file running in `packages/core/src/__tests__/benchmarks/comprehensive-bench.ts`
- Use `pnpm -F @ogxjs/core bench` to run benchmarks
- Results saved to `benchmarks/` and `BENCHMARKS.md` -> this folder includes results and analysis.
- See [benchmarks/guides.md](benchmarks/guides.md) for detailed instructions on running and interpreting benchmarks.