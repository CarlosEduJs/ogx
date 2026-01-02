/**
 * @ogxjs/core - Performance Tools Tests
 * Tests for the timing and profiling utilities
 */

import { beforeEach, describe, expect, it } from "vitest";
import {
	benchmark,
	benchmarkSync,
	quickTime,
	quickTimeSync,
	Timer,
	timing,
} from "../../perf/timing";

describe("Performance Tools v0.2.0", () => {
	describe("Timer class", () => {
		it("deve criar timer", () => {
			const timer = new Timer();
			expect(timer).toBeDefined();
		});

		it("deve medir tempo de execução", async () => {
			const timer = new Timer();

			timer.start("test");
			// Simulate some work
			await new Promise((resolve) => setTimeout(resolve, 10));
			const elapsed = timer.end("test");

			expect(elapsed).toBeGreaterThanOrEqual(10);
			expect(elapsed).toBeLessThan(100); // sanity check
		});

		it("deve gerar relatório", () => {
			const timer = new Timer();

			timer.start("op1");
			timer.end("op1");
			timer.start("op2");
			timer.end("op2");

			const report = timer.getReport();

			expect(report.entries).toHaveLength(2);
			expect(report.summary.entryCount).toBe(2);
		});

		it("deve formatar relatório como string", () => {
			const timer = new Timer();

			timer.start("render");
			timer.end("render");

			const formatted = timer.getFormattedReport();

			expect(typeof formatted).toBe("string");
			expect(formatted).toContain("Performance Report");
		});

		it("deve limpar entries", () => {
			const timer = new Timer();

			timer.start("test");
			timer.end("test");
			timer.clear();

			const report = timer.getReport();
			expect(report.entries).toHaveLength(0);
		});

		it("deve desabilitar medição quando disabled", () => {
			const timer = new Timer(false);

			timer.start("test");
			const elapsed = timer.end("test");

			expect(elapsed).toBe(0);
		});

		it("deve medir operação async com measure()", async () => {
			const timer = new Timer();

			const result = await timer.measure("async-op", async () => {
				await new Promise((resolve) => setTimeout(resolve, 5));
				return "done";
			});

			expect(result).toBe("done");
			expect(timer.getReport().entries[0]?.duration).toBeGreaterThan(0);
		});

		it("deve medir operação sync com measureSync()", () => {
			const timer = new Timer();

			const result = timer.measureSync("sync-op", () => {
				let sum = 0;
				for (let i = 0; i < 1000; i++) sum += i;
				return sum;
			});

			expect(result).toBe(499500);
			expect(timer.getReport().entries[0]?.duration).toBeGreaterThanOrEqual(0);
		});
	});

	describe("timing singleton", () => {
		beforeEach(() => {
			timing.clear();
		});

		it("deve criar e gerenciar timers por nome", () => {
			timing.start("operation-a");
			timing.end("operation-a");

			const report = timing.getReport();
			expect(report.entries.length).toBeGreaterThan(0);
		});

		it("deve gerar relatório", () => {
			timing.start("report-test");
			timing.end("report-test");

			const report = timing.getReport();

			expect(report).toHaveProperty("entries");
			expect(report).toHaveProperty("totals");
			expect(report).toHaveProperty("summary");
		});

		it("deve limpar todos os timers", () => {
			timing.start("to-clear");
			timing.end("to-clear");

			timing.clear();

			const report = timing.getReport();
			expect(report.entries).toHaveLength(0);
		});

		it("deve habilitar/desabilitar", () => {
			timing.disable();
			expect(timing.isEnabled()).toBe(false);

			timing.enable();
			expect(timing.isEnabled()).toBe(true);
		});
	});

	describe("quickTime helpers", () => {
		it("quickTimeSync deve medir função síncrona", () => {
			const [result, time] = quickTimeSync(() => {
				let sum = 0;
				for (let i = 0; i < 1000; i++) sum += i;
				return sum;
			});

			expect(result).toBe(499500);
			expect(time).toBeGreaterThanOrEqual(0);
		});

		it("quickTime deve medir função assíncrona", async () => {
			const [result, time] = await quickTime(async () => {
				await new Promise((resolve) => setTimeout(resolve, 5));
				return "done";
			});

			expect(result).toBe("done");
			expect(time).toBeGreaterThanOrEqual(5);
		});
	});

	describe("benchmark helpers", () => {
		it("benchmarkSync deve executar múltiplas iterações", () => {
			let executions = 0;

			const result = benchmarkSync(() => {
				executions++;
			}, 10);

			expect(executions).toBe(10);
			expect(result.count).toBe(10);
			expect(result.minMs).toBeGreaterThanOrEqual(0);
			expect(result.maxMs).toBeGreaterThanOrEqual(result.minMs);
			expect(result.avgMs).toBeGreaterThanOrEqual(result.minMs);
			expect(result.avgMs).toBeLessThanOrEqual(result.maxMs);
		});

		it("benchmark deve executar múltiplas iterações async", async () => {
			let executions = 0;

			const result = await benchmark(async () => {
				executions++;
			}, 5);

			expect(executions).toBe(5);
			expect(result.count).toBe(5);
		});
	});
});
