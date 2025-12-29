# @ogxjs/next

> Next.js integration for OGX - Generate OG images in App Router

Utilities for generating Open Graph images in Next.js App Router.

## Installation

```bash
npm install @ogxjs/next @ogxjs/core
```

## Next.js Configuration

Add this to your `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const config = {
  serverExternalPackages: ["@resvg/resvg-js", "@ogxjs/core"],
};

export default config;
```

> **Important:** The `serverExternalPackages` setting prevents Next.js from bundling native dependencies, which is required for `@resvg/resvg-js`.

## Usage

Create a route handler that returns an OG image:

```typescript
// app/api/og/route.tsx
import { ogxResponse } from "@ogxjs/next";

export async function GET() {
  return ogxResponse({
    preset: "minimal",
    title: "Hello from Next.js!",
    subtitle: "Dynamic OG images",
  });
}
```

The `ogxResponse` helper automatically:
- Sets correct `Content-Type: image/png`
- Returns a Next.js `Response` object
- Handles errors gracefully

## Dynamic OG Images

Use route parameters for dynamic content:

```typescript
// app/api/og/[slug]/route.tsx
import { ogxResponse } from "@ogxjs/next";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  return ogxResponse({
    preset: "blog",
    title: params.slug.replace(/-/g, " "),
    description: "Read more about this topic",
  });
}
```

## Custom Builder

Use the builder API for custom layouts:

```typescript
import { ogxResponse } from "@ogxjs/next";
import { stack, div, span } from "@ogxjs/core";

export async function GET() {
  const element = stack("w-full h-full bg-blue-500 p-20", [
    div("text-white text-6xl font-bold", "Custom Layout"),
  ]);

  return ogxResponse({ element });
}
```

## Metadata

Link your OG image in page metadata:

```typescript
// app/page.tsx
export const metadata = {
  openGraph: {
    images: ['/api/og'],
  },
};
```

## Performance Tips

### Static Generation

For better performance, disable revalidation and use static params:

```typescript
// app/api/og/[slug]/route.tsx
export const revalidate = false; // Disable ISR

export function generateStaticParams() {
  return [
    { slug: 'hello' },
    { slug: 'world' },
  ];
}
```

### Caching

OGX includes built-in caching. Images with the same config will be cached:

```typescript
return ogxResponse({
  preset: "blog",
  title: "My Post",
  cache: true, // Enable caching (default)
});
```

## License

MIT
