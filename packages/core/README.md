# @ogxjs/core

> Tailwind-first OG image generator powered by Satori

Generate beautiful Open Graph images using Tailwind CSS classes and an ergonomic builder API. Built for Node.js, also compatible with Bun and Deno.

## Installation

```bash
npm install @ogxjs/core
# or
bun add @ogxjs/core
```

## Quick Start

```typescript
import { ogx } from "@ogxjs/core";
import { writeFile } from "node:fs/promises";

// Generate a PNG using a preset
const image = await ogx({
  preset: "minimal",
  title: "Hello, World!",
  subtitle: "This is my OG image",
});

// Save to file
await writeFile("og.png", image);
```

## Builder API

Create custom layouts with an ergonomic builder:

```typescript
import { stack, div, span, render } from "@ogxjs/core";

const element = stack("w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 p-20", [
  div("bg-white rounded-2xl p-12 shadow-2xl", [
    span("text-6xl font-bold text-gray-900", "Custom Layout"),
    span("text-2xl text-gray-600 mt-4", "Built with Tailwind classes"),
  ]),
]);

const image = await render(element);
```

## Presets

Built-in presets for common use cases:

- `minimal` - Clean and simple
- `blog` - Blog post headers
- `docs` - Documentation pages
- `social` - Social media cards

```typescript
await ogx({
  preset: "blog",
  title: "Building with OGX",
  description: "Learn how to create dynamic OG images",
  author: "John Doe",
  date: "Dec 28, 2024",
});
```

## Custom Fonts

```typescript
import { loadInterFont, fontRegistry } from "@ogxjs/core";

// Load and register fonts
const inter = await loadInterFont(400);
fontRegistry.register(inter);

// Use in your images
await ogx({
  preset: "minimal",
  title: "Custom Font",
  fonts: fontRegistry.getFonts(),
});
```

## Browser-safe SVG Rendering

```typescript
import { renderToSVG } from "@ogxjs/core/svg";

// Render to SVG (no Node.js dependencies)
const svg = await renderToSVG(element);
```

## Exports

- `@ogxjs/core` - Main package (PNG rendering, presets, builder)
- `@ogxjs/core/svg` - Browser-safe SVG rendering
- `@ogxjs/core/png` - Node.js PNG rendering

## License

MIT
