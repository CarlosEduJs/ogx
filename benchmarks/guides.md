# Benchmark Execution Guide

## Quick Start

Run benchmarks directly from the repository root:

```bash
pnpm -F @ogxjs/core bench
```

This executes 100 iterations per scenario and saves results to `benchmarks/results.json` and `benchmarks/BENCHMARKS.md`.

## Recommended Environment

For consistent results:

1. Close unnecessary applications and browser tabs
2. Disable background processes (updates, indexing, etc.)
3. Run multiple times and compare median values
4. Use the same Node.js version across runs

## Linux-Specific Optimizations (Optional)

For maximum consistency on Linux systems:

1. Set CPU governor to performance:
   ```bash
   sudo cpupower frequency-set --governor performance
   ```

2. Disable CPU turbo boost (Intel):
   ```bash
   echo 1 | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo
   ```

3. Clear system caches before each run:
   ```bash
   sudo sync && sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'
   ```

4. Restore settings after benchmarking:
   ```bash
   echo 0 | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo
   sudo cpupower frequency-set --governor powersave
   ```

## Interpreting Results

Focus on median and p90 values rather than mean to minimize impact of outliers. Standard deviation below 10ms indicates stable measurements.