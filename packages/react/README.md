# @ogxjs/react

> React components for OGX - Build OG images with JSX

Create Open Graph images using familiar React components and JSX syntax.

## Installation

```bash
npm install @ogxjs/react @ogxjs/core
```

## Quick Start

```tsx
import { Stack, H1, P } from "@ogxjs/react";
import { render } from "@ogxjs/react/png";

const MyImage = () => (
  <Stack tw="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 p-20">
    <H1 tw="text-white">Hello, React!</H1>
    <P tw="text-white/80">Build OG images with JSX</P>
  </Stack>
);

const image = await render(<MyImage />);
```

## Components

Pre-built components with Tailwind support:

- `<Stack>` - Flex column layout
- `<Row>` - Flex row layout
- `<Box>` - Generic container
- `<H1>`, `<H2>` - Headings
- `<P>` - Paragraph
- `<Span>` - Inline text
- `<Card>` - Card with shadow
- `<Badge>` - Colored badge
- `<Absolute>` - Absolute positioned
- `<Grid>` - Grid layout
- `<Spacer>` - Flexible spacer

## Styling

Use the `tw` prop for Tailwind classes:

```tsx
import { Stack, H1, Badge } from "@ogxjs/react";

<Stack tw="w-full h-full bg-slate-900 p-20 items-center justify-center">
  <H1 tw="text-white mb-4">My Title</H1>
  <Badge color="blue">New</Badge>
</Stack>
```

## Browser-safe SVG

Render to SVG without Node.js dependencies:

```tsx
import { renderToSVG } from "@ogxjs/react/svg";

const svg = await renderToSVG(<MyImage />);
// Use in browser, no Node.js required
```

## PNG Rendering

Render to PNG (Node.js only):

```tsx
import { render } from "@ogxjs/react/png";
import { writeFile } from "node:fs/promises";

const image = await render(<MyImage />);
await writeFile("og.png", image);
```

## Exports

- `@ogxjs/react` - Components and utilities
- `@ogxjs/react/svg` - Browser-safe SVG rendering
- `@ogxjs/react/png` - Node.js PNG rendering
- `@ogxjs/react/jsx` - JSX type definitions

## License

MIT
