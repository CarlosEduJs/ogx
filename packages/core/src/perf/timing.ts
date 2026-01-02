/**
 * @ogxjs/core - Performance Timing API
 * Profiling and performance measurement tools
 *
 * @description
 * Provides timing utilities for measuring OGX performance:
 * - Timer API for manual measurements
 * - Automatic instrumentation for render pipeline
 * - Report generation with statistics
 *
 * @version 0.2.0 "Turbo"
 */

// TYPES

export interface TimingEntry {
	label: string;
	startTime: number;
	endTime?: number;
	duration?: number;
}

export interface TimingReport {
	entries: TimingEntry[];
	totals: Record<string, TimingAggregate>;
	summary: {
		totalDuration: number;
		entryCount: number;
		averageDuration: number;
	};
}

export interface TimingAggregate {
	count: number;
	totalMs: number;
	minMs: number;
	maxMs: number;
	avgMs: number;
}

// TIMING CLASS

/**
 * Performance timer for measuring code execution
 *
 * @example
 * ```ts
 * const timer = new Timer();
 *
 * timer.start("render");
 * await render(element);
 * timer.end("render");
 *
 * timer.start("png-conversion");
 * const png = convertToPng(svg);
 * timer.end("png-conversion");
 *
 * console.log(timer.getReport());
 * // { entries: [...], totals: {...}, summary: {...} }
 * ```
 */
export class Timer {
	private entries: TimingEntry[] = [];
	private active = new Map<string, TimingEntry>();
	private enabled: boolean;

	constructor(enabled = true) {
		this.enabled = enabled;
	}

	/**
	 * Start a timing measurement
	 */
	start(label: string): void {
		if (!this.enabled) return;

		const entry: TimingEntry = {
			label,
			startTime: performance.now(),
		};

		this.active.set(label, entry);
	}

	/**
	 * End a timing measurement
	 * @returns Duration in milliseconds
	 */
	end(label: string): number {
		if (!this.enabled) return 0;

		const entry = this.active.get(label);
		if (!entry) {
			console.warn(`Timer: No active timer for "${label}"`);
			return 0;
		}

		entry.endTime = performance.now();
		entry.duration = entry.endTime - entry.startTime;

		this.entries.push(entry);
		this.active.delete(label);

		return entry.duration;
	}

	/**
	 * Measure an async operation
	 */
	async measure<T>(label: string, fn: () => Promise<T>): Promise<T> {
		this.start(label);
		try {
			return await fn();
		} finally {
			this.end(label);
		}
	}

	/**
	 * Measure a sync operation
	 */
	measureSync<T>(label: string, fn: () => T): T {
		this.start(label);
		try {
			return fn();
		} finally {
			this.end(label);
		}
	}

	/**
	 * Get timing report
	 */
	getReport(): TimingReport {
		// Aggregate by label
		const totals: Record<string, TimingAggregate> = {};

		for (const entry of this.entries) {
			if (entry.duration === undefined) continue;

			if (!totals[entry.label]) {
				totals[entry.label] = {
					count: 0,
					totalMs: 0,
					minMs: Infinity,
					maxMs: -Infinity,
					avgMs: 0,
				};
			}

			const agg = totals[entry.label]!;
			agg.count++;
			agg.totalMs += entry.duration;
			agg.minMs = Math.min(agg.minMs, entry.duration);
			agg.maxMs = Math.max(agg.maxMs, entry.duration);
		}

		// Calculate averages
		for (const label of Object.keys(totals)) {
			const agg = totals[label]!;
			agg.avgMs = agg.totalMs / agg.count;
		}

		// Calculate summary
		const totalDuration = this.entries.reduce(
			(sum, e) => sum + (e.duration ?? 0),
			0,
		);
		const entryCount = this.entries.filter(
			(e) => e.duration !== undefined,
		).length;

		return {
			entries: [...this.entries],
			totals,
			summary: {
				totalDuration,
				entryCount,
				averageDuration: entryCount > 0 ? totalDuration / entryCount : 0,
			},
		};
	}

	/**
	 * Get formatted report string
	 */
	getFormattedReport(): string {
		const report = this.getReport();
		const lines: string[] = [
			"┌─────────────────────────────────────────────────────┐",
			"│              OGX Performance Report                 │",
			"├─────────────────────────────────────────────────────┤",
		];

		// Totals by label
		for (const [label, agg] of Object.entries(report.totals)) {
			lines.push(
				`│ ${label.padEnd(20)} │ ${agg.avgMs.toFixed(2).padStart(8)}ms avg │`,
			);
			lines.push(
				`│ ${"".padEnd(20)} │ ${agg.count.toString().padStart(8)} calls │`,
			);
		}

		lines.push("├─────────────────────────────────────────────────────┤");
		lines.push(
			`│ Total: ${report.summary.totalDuration.toFixed(2)}ms (${report.summary.entryCount} entries) │`,
		);
		lines.push("└─────────────────────────────────────────────────────┘");

		return lines.join("\n");
	}

	/**
	 * Clear all entries
	 */
	clear(): void {
		this.entries = [];
		this.active.clear();
	}

	/**
	 * Enable/disable timing
	 */
	setEnabled(enabled: boolean): void {
		this.enabled = enabled;
	}

	/**
	 * Check if timing is enabled
	 */
	isEnabled(): boolean {
		return this.enabled;
	}
}

// GLOBAL TIMER

/**
 * Global timer instance for OGX operations
 * Disabled by default in production
 */
const globalTimer = new Timer(process.env.NODE_ENV !== "production");

/**
 * Global timing API
 */
export const timing = {
	/**
	 * Start a timing measurement
	 */
	start(label: string): void {
		globalTimer.start(label);
	},

	/**
	 * End a timing measurement
	 */
	end(label: string): number {
		return globalTimer.end(label);
	},

	/**
	 * Measure an async operation
	 */
	measure<T>(label: string, fn: () => Promise<T>): Promise<T> {
		return globalTimer.measure(label, fn);
	},

	/**
	 * Measure a sync operation
	 */
	measureSync<T>(label: string, fn: () => T): T {
		return globalTimer.measureSync(label, fn);
	},

	/**
	 * Get timing report
	 */
	getReport(): TimingReport {
		return globalTimer.getReport();
	},

	/**
	 * Get formatted report string
	 */
	getFormattedReport(): string {
		return globalTimer.getFormattedReport();
	},

	/**
	 * Clear all timing entries
	 */
	clear(): void {
		globalTimer.clear();
	},

	/**
	 * Enable timing (useful for debugging in production)
	 */
	enable(): void {
		globalTimer.setEnabled(true);
	},

	/**
	 * Disable timing
	 */
	disable(): void {
		globalTimer.setEnabled(false);
	},

	/**
	 * Check if timing is enabled
	 */
	isEnabled(): boolean {
		return globalTimer.isEnabled();
	},
};

// QUICK TIMING UTILITIES

/**
 * Quick one-off timing for a function
 * Returns [result, durationMs]
 */
export async function quickTime<T>(fn: () => Promise<T>): Promise<[T, number]> {
	const start = performance.now();
	const result = await fn();
	const duration = performance.now() - start;
	return [result, duration];
}

/**
 * Quick one-off timing for a sync function
 */
export function quickTimeSync<T>(fn: () => T): [T, number] {
	const start = performance.now();
	const result = fn();
	const duration = performance.now() - start;
	return [result, duration];
}

/**
 * Benchmark a function multiple times
 * Returns statistics
 */
export async function benchmark(
	fn: () => Promise<void>,
	iterations = 100,
): Promise<TimingAggregate> {
	const durations: number[] = [];

	for (let i = 0; i < iterations; i++) {
		const start = performance.now();
		await fn();
		durations.push(performance.now() - start);
	}

	const totalMs = durations.reduce((sum, d) => sum + d, 0);

	return {
		count: iterations,
		totalMs,
		minMs: Math.min(...durations),
		maxMs: Math.max(...durations),
		avgMs: totalMs / iterations,
	};
}

/**
 * Benchmark a sync function
 */
export function benchmarkSync(
	fn: () => void,
	iterations = 100,
): TimingAggregate {
	const durations: number[] = [];

	for (let i = 0; i < iterations; i++) {
		const start = performance.now();
		fn();
		durations.push(performance.now() - start);
	}

	const totalMs = durations.reduce((sum, d) => sum + d, 0);

	return {
		count: iterations,
		totalMs,
		minMs: Math.min(...durations),
		maxMs: Math.max(...durations),
		avgMs: totalMs / iterations,
	};
}
