# OGX

**High-performance Open Graph image generation with Tailwind CSS.**

Generate dynamic OG images in 60ms with full Tailwind support, built-in caching, and seamless framework integration.

[![npm version](https://img.shields.io/npm/v/@ogxjs/core.svg)](https://www.npmjs.com/package/@ogxjs/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- ⚡ **60ms render time** - Blazing fast image generation
- 🎨 **Tailwind-first** - Use Tailwind classes directly
- 🔄 **85x faster caching** - Smart cache with 0.7ms cached renders
- 🎯 **Framework adapters** - Next.js, React, and more
- 🌙 **Dark mode ready** - Built-in color scheme support

## Quick Start

```bash
npm install @ogxjs/next @ogxjs/core
```

```tsx
// app/og/route.tsx
import { ogxResponse } from '@ogxjs/next';

export async function GET(req: Request) {
  return ogxResponse({
    preset: 'docs',
    title: 'Hello OGX',
    description: 'High-performance OG images',
    colorScheme: 'dark',
  }, req);
}
```

## Packages

- **[@ogxjs/core](./packages/core)** - Core rendering engine
- **[@ogxjs/next](./packages/next)** - Next.js adapter
- **[@ogxjs/react](./packages/react)** - React adapter with JSX support

## Documentation

Visit [ogx.dev](https://ogx-three.vercel.app) for full documentation, examples, and playground.

## Examples

- [Next.js Example](./examples/example-ogx-with-nextjs)
- [React Vanilla Example](./examples/example-ogx-with-react-vanilla)

## Performance

| Preset | Render Time | Cached |
|--------|-------------|--------|
| Minimal | ~60ms | ~0.7ms |
| Social | ~693ms | ~0.7ms |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

MIT © [Carlos Eduardo](https://github.com/carlosedujs)
