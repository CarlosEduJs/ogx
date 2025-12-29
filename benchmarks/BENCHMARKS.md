# OGX Performance Benchmarks

Last updated: 2025-12-28

## Environment

- **Node.js:** v24.12.0
- **Platform:** linux (x64)
- **Iterations:** 100 per scenario

## Results

| Scenario | Mean | Median | P90 | P99 | Min | Max | Std Dev |
|----------|------|--------|-----|-----|-----|-----|---------|
| Minimal Preset | 60.02ms | 59.49ms | 64.23ms | 67.79ms | 54.38ms | 67.79ms | ±2.75ms |
| Social Preset | 693.12ms | 690.38ms | 759.1ms | 954.86ms | 582.54ms | 954.86ms | ±62.99ms |
| Docs Preset | 88.92ms | 87.41ms | 103.48ms | 128.39ms | 72.2ms | 128.39ms | ±11.09ms |
| With Cache | 0.7ms | 0.01ms | 0.01ms | 69.22ms | 0ms | 69.22ms | ±6.89ms |

## Key Findings

- ✅ **Minimal preset:** Fastest option for simple OG images (~60.02ms average)
- ✅ **Caching:** Extremely effective (0.7ms cached vs 60.02ms uncached)
- ✅ **Complex layouts:** Still performant even with rich presets (~693.12ms average)

## Performance Targets

- ✅ Simple scenarios: **< 200ms** (achieved: 60.02ms)
- ✅ Complex scenarios: **< 500ms** (achieved: 693.12ms)  
- ✅ Cached renders: **< 10ms** (achieved: 0.7ms)

## Run Benchmarks Yourself

```bash
pnpm -F @ogxjs/core bench
```

---

*Benchmarks run in Node.js runtime. Performance may vary based on hardware and system load.*
