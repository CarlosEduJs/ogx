# OGX + React (Vanilla) Example

A minimal example showing how to use **OGX React** with Vite to create and preview Open Graph images in the browser.

## Features

- ✅ Browser-safe SVG rendering with `renderToSVG()`
- ✅ React components with `tw` prop for Tailwind
- ✅ Live preview in the browser
- ✅ Export to SVG
- ✅ No server required

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to see the live preview.

## Project Structure

```
src/
├── App.tsx           # Main app with OGX preview
├── App.css           # Styles
├── main.tsx          # Entry point
└── ogx.d.ts          # Type augmentation for `tw` prop
```

## Usage

### Basic Component

```tsx
import { Stack, H1, P } from "@ogxjs/react";
import { renderToSVG } from "@ogxjs/react/svg";

function MyOGImage() {
  return (
    <Stack tw="w-[1200px] h-[630px] bg-zinc-950 p-24 items-center justify-center">
      <H1 tw="text-white text-6xl font-bold">Hello OGX</H1>
      <P tw="text-zinc-400 text-2xl">Browser-safe rendering</P>
    </Stack>
  );
}

// Render to SVG
const svg = await renderToSVG(<MyOGImage />);
```

### Type Augmentation

Create `ogx.d.ts` to enable the `tw` prop:

```ts
import "@ogxjs/react";
```

## Learn More

- [OGX Documentation](https://ogx.dev/docs)
- [React Adapter Guide](https://ogx.dev/docs/adapters/react)
- [Playground](https://ogx.dev/playground)

## Notes

This example uses **browser-safe rendering** (`/svg` import). For server-side PNG generation, use `@ogxjs/react/png` in a Node.js environment.
