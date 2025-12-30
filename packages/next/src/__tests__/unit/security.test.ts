import * as core from "@ogxjs/core";
import { describe, expect, it, vi } from "vitest";
import { ogxResponse } from "../../response";

// Mock @ogxjs/core
vi.mock("@ogxjs/core", () => ({
	ogx: vi.fn(),
}));

describe("Security: Error Sanitization in ogxResponse", () => {
	it("should show full error in development", async () => {
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "development";

		try {
			const secretError = new Error(
				"Sensitive database error at /internal/path",
			);
			vi.mocked(core.ogx).mockRejectedValue(secretError);

			const response = await ogxResponse({
				preset: "minimal",
				title: "Test",
			} as any);

			const data = await response.json();
			expect(data.error).toContain("Sensitive database error");
			expect(response.status).toBe(500);
		} finally {
			process.env.NODE_ENV = originalEnv;
		}
	});

	it("should sanitize error message in production", async () => {
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "production";

		try {
			const secretError = new Error(
				"Sensitive database error at /internal/path",
			);
			vi.mocked(core.ogx).mockRejectedValue(secretError);

			const response = await ogxResponse({
				preset: "minimal",
				title: "Test",
			} as any);

			const data = await response.json();
			expect(data.error).toBe(
				"An internal error occurred while generating the image.",
			);
			expect(data.error).not.toContain("Sensitive database error");
			expect(response.status).toBe(500);
		} finally {
			process.env.NODE_ENV = originalEnv;
		}
	});
});
