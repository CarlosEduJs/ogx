# OGX Roadmap - Future Versions

> **Vision**: Making OGX the fastest and most flexible tool for generating OG images, built for developers who love Tailwind.

## Current State

- **@ogxjs/core**: `0.2.0-alpha.1` "Turbo" - New parser, sync caching, and better performance tools.
- **@ogxjs/next**: `0.1.1` - Simple adapter for Next.js Route Handlers.
- **@ogxjs/react**: `0.1.2` - JSX components using the same `tw` prop you know.
- **@ogxjs/tanstack-start**: `0.1.0` - Coming soon!

---

## Core 0.2.0 - "Streaming Edition"

### What's coming next

#### 1. CLI Tool
**Branch**: `feat/core-cli`  
**Priority**: HIGH (Phase 1)

A CLI that lets you generate images right from your terminal or build scripts. This is huge for static sites and CI/CD pipelines where you don't want a full server running just to get your OG images.

**Features**:
- **Generate**: Just run `ogx generate <input>` and you're good.
- **Config**: Use `ogx.config.ts` to keep your settings in one place.
- **Template Scaffold**: Quickly start with `ogx init`.
- **Watch Mode**: Live updates while you're working on templates.
- **Batching**: Generate dozens of images in one go.

---

#### 2. Flexible Font System (Geist + Fallback)
**Branch**: `feat/core-fonts`  
**Priority**: HIGH (Phase 1)

Custom fonts were the #1 request. We're making it super simple to load any font via URL (Google Fonts, Fontsource, etc.) while keeping Inter as a reliable fallback if anything goes wrong.

**Example**:
```typescript
await ogx({
  preset: 'docs',
  fonts: {
    primary: { 
      url: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;700',
      fallback: 'inter'
    }
  }
});
```

---

#### 3. Progressive Streaming Render
**Branch**: `feat/core-streaming`  
**Priority**: HIGH (Phase 2)

We're introducing streaming to make images *feel* faster. Instead of waiting for the whole render, we can send the base layout first and then fill in the details.

**The plan**:
- **Layered Render**: Send the structure first, then the polished text/images.
- **Async API**: A simple `streamOGX()` function for your backend.
- **Smart Caching**: Even streaming chunks can be cached.

---

### Performance & DX

#### 4. Distributed Caching (Adapters)
**Branch**: `feat/core-cache-v3`  
**Priority**: MEDIUM (Phase 2)

Making OGX ready for the big leagues with native support for Redis and Cloudflare KV. Perfect for keeping things fast across multiple server instances or at the edge.

#### 5. Tailwind v4 & Better Support
**Branch**: `feat/core-tailwind-v4`  
**Priority**: MEDIUM (Phase 2)

Tailwind v4 is here and we're moving with it. We'll upgrade the parser to support the new CSS-based configuration (like `@theme`) and add missing utilities like `backdrop-blur` and `mix-blend-mode`. Support for the traditional `tailwind.config.js` will also be polished.

#### 6. Debugging Tools
**Branch**: `feat/core-devtools`  
**Priority**: LOW (Phase 4)

A debug mode that shows you exactly how layers are being rendered and bounding boxes, plus a profiler to see where every millisecond is going.

---

### Presets & Quality

#### 7. Built-in Slide Preset
**Branch**: `feat/core-presets`  
**Priority**: MEDIUM (Phase 3)

A clean `slide` preset for quick presentations. We're moving highly specific presets (like GitHub styles) to a separate community repo to keep the core library lean.

#### 8. Improve blog preset
**Branch**: `feat/core-presets`  
**Priority**: MEDIUM (Phase 3)

Improve the blog preset to support profiles and make it more flexible.

#### 9. Visual Testing
**Branch**: `feat/core-visual-tests`  
**Priority**: LOW (Phase 4)

Automated snapshot tests to make sure new updates don't accidentally break your favorite presets.

---

## Next.js Adapter (@ogxjs/next)

### Features

#### 1. Streaming for Routes
**Branch**: `feat/next-streaming`  
**Priority**: HIGH (Phase 2)

Seamless integration of the new streaming engine into your Next.js Route Handlers.

#### 2. App Router Helpers
**Branch**: `feat/next-app-router`  
**Priority**: MEDIUM (Phase 3)

Better integration with `generateMetadata()` and Next.js static generation out of the box.

---

## React Adapter (@ogxjs/react)

### Features

#### 1. Component Library
**Branch**: `feat/react-components`  
**Priority**: MEDIUM (Phase 3)

The essentials: `<Avatar>`, `<Badge>`, `<Center>`, and more components to make JSX layouts even easier.

#### 2. Dev Mode Polish
**Branch**: `feat/react-hmr`  
**Priority**: LOW (Phase 4)

Improving how live previews work while you're coding your React templates.

---

## TanStack Start Adapter (@ogxjs/tanstack-start)

### Features

#### 1. First-class Integration
**Branch**: `feat/tanstack-start-core`  
**Priority**: HIGH (Phase 3)

Native adapter for TanStack Start, supporting both API routes and server functions with full type safety.

#### 2. Streaming support
**Branch**: `feat/tanstack-start-streaming`  
**Priority**: LOW (Phase 4)

Parity with the Next.js adapter for progressive image rendering.

---

## The Roadmap

### Phase 1 - Foundations (Q1 2026)
1. **CLI Tool** - The foundation for static/CI workflows.
2. **Flexible Fonts** - Custom font support for everyone.
3. **Core Polish** - Refining the "Turbo" engine.

### Phase 2 - Performance (Q1-Q2 2026)
4. **Streaming** - Making renders feel instant.
5. **Caching** - Redis & Cloudflare adapters (pending confirmation).
6. **Tailwind v4** - Support for CSS-based `@theme` configuration.

### Phase 3 - Ecosystem (Q2 2026)
7. **Adapters** - Next.js & TanStack Start improvements.
8. **React Components** - Building out the helper library.
9. **Slide Preset** - A new way to use OGX.

### Phase 4 - Tooling (Q3 2026)
10. **Debug Tools** - Better dev experience.
11. **Visual Tests** - Long-term stability.
12. **Live Previews** - Polishing the dev loop.

---

## Success Metrics

- **Speed**: < 50ms for cached renders (let's keep it fast).
- **Weight**: Keep the core under **40KB gzipped**.
- **Adoption**: Hitting 500+ stars and 5k+ downloads by mid-2026.
- **Workflow**: 30% of users moving to a CLI-based build flow.

---

## Contributing

1. **Pick something** you're interested in from the phases above.
2. **Open a branch** with the name (e.g., `feat/...`).
3. **Small PRs** are usually better and easier to review!

---

> This roadmap is subject to change as we continue to refine our vision for OGX. Suggest features in issues or open a PR with your ideas!

---
