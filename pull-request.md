## Description
Release v0.3.0 "Universal Fonts" - Universal font loading system with Google Fonts and local font support. Removes bundled Inter fonts (~340KB) and uses CDN-based loading by default.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [x] New feature (non-breaking change that adds functionality)
- [x] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [x] Documentation update

## Changes Implemented

### Universal Font Loading System

**Files**: 
- `packages/core/src/fonts.ts`: Added `loadGoogleFont()` and `loadFontFromFile()` functions, deprecated `loadInterFont()`
- `packages/core/src/font-registry.ts`: Added `registerGoogleFont()` and `registerFontFromFile()` methods, deprecated `registerInter()`
- `packages/core/src/ogx.ts`: Replaced `loadInterFont` with `loadInterFromUrl` for default font loading
- `packages/core/src/index.ts`: Added exports for new font functions
- `packages/core/package.json`: Updated version to 0.3.0, removed font copying from build script

### Removed Bundled Fonts

**Files**:
- `packages/core/src/fonts/inter/` (DELETED): Removed 5 Inter font files (~340KB total)

### Updated Tests

**Files**:
- `packages/core/src/__tests__/unit/builder-test.ts`: Updated to use `loadInterFromUrl`
- `packages/core/src/__tests__/features/advanced-features-test.ts`: Updated to use `loadInterFromUrl`

### Documentation Updates

**Files**:
- `CHANGELOG.md`: Added v0.3.0 release notes
- `ROADMAP.md`: Updated current state to v0.3.0, marked Flexible Fonts as completed

## Related Issues
N/A - Feature implementation from roadmap

## Testing
- Unit Tests: All 89 tests passed
- Build: `pnpm build` successful, dist size reduced from ~620KB to ~576KB
- Type Checking: `pnpm check-types` – no errors

## Breaking Changes
- Removed bundled Inter font files from package
- Default font loading now uses CDN (requires network access on first render)
- Deprecated `loadInterFont()` → use `loadInterFromUrl()`
- Deprecated `fontRegistry.registerInter()` → use `registerInterFromUrl()`

## Backward Compatibility
APIs are deprecated but still functional. Users should migrate to new APIs before v1.0.0.

## Checklist
- [x] My code follows the code style of this project
- [x] I have updated the documentation accordingly
- [x] I have added tests that prove my fix/feature works
- [x] All new and existing tests pass (`pnpm test`)
- [x] I have updated the CHANGELOG.md (if applicable)
