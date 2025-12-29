# OGX + Next.js Example

A minimal example showing how to use **OGX** with Next.js App Router to generate dynamic Open Graph images.

## Features

- ✅ Dynamic OG image generation with `ogxResponse()`
- ✅ Multiple presets (minimal, docs, social)
- ✅ Automatic font loading
- ✅ Edge-compatible configuration

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the example.

## Project Structure

```
src/app/
├── page.tsx              # Home page
├── og/
│   └── route.tsx         # OG image generation endpoint
└── layout.tsx
```

## Usage

### Basic OG Route

```ts
// app/og/route.tsx
import { ogxResponse } from "@ogxjs/next";

export async function GET(req: Request) {
  return ogxResponse(
    {
      preset: "docs",
      title: "Hello OGX",
      description: "High-performance OG images",
      siteName: "My Site",
    },
    req
  );
}
```

### Next.js Configuration

Add to your `next.config.ts`:

```ts
const config = {
  serverExternalPackages: ["@resvg/resvg-js"],
};
export default config;
```

## Learn More

- [OGX Documentation](https://ogx.dev/docs)
- [Next.js Adapter Guide](https://ogx.dev/docs/adapters/next)
- [Performance Tips](https://ogx.dev/docs/core/performance)

## Deploy

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/carlosedujs/ogx/tree/main/examples/example-ogx-with-nextjs)
