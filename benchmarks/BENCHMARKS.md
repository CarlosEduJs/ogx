# OGX Performance Benchmarks

Last updated: 2026-01-02

## Environment

- **Node.js:** v24.12.0
- **Platform:** linux (x64)
- **Iterations:** 100 per scenario

## Results

| Scenario | Mean | Median | P90 | P99 | Min | Max | Std Dev |
|----------|------|--------|-----|-----|-----|-----|---------|
| Minimal Preset | 39.71ms | 38.86ms | 43.52ms | 45.64ms | 37.53ms | 45.64ms | ±1.96ms |
| Social Preset | 58.65ms | 58.2ms | 62.1ms | 64.83ms | 55.64ms | 64.83ms | ±2.08ms |
| Docs Preset | 41.25ms | 40.45ms | 44.92ms | 49.12ms | 38.94ms | 49.12ms | ±2.05ms |
| Custom Layout | 52.47ms | 51.65ms | 56.21ms | 61.38ms | 50.14ms | 61.38ms | ±2.24ms |
| With Cache | 0.04ms | 0.02ms | 0.07ms | 0.47ms | 0.02ms | 0.47ms | ±0.06ms |

## Key Findings

- **Minimal preset:** Fastest option for simple OG images (~39.71ms average)
- **Caching:** Extremely effective (0.04ms cached vs 39.71ms uncached)
- **Complex layouts:** Still performant even with rich presets (~58.65ms average)
- **Custom layouts:** Builder API performs similarly to presets (~52.47ms average)

## Performance Targets

- Simple scenarios: **< 200ms** (achieved: 39.71ms)
- Complex scenarios: **< 500ms** (achieved: 58.65ms)  
- Cached renders: **< 10ms** (achieved: 0.04ms)

## Run Benchmarks Yourself

```bash
pnpm -F @ogxjs/core bench
```

---

*Benchmarks run in Node.js runtime. Performance may vary based on hardware and system load.*
