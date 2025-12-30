import { describe, expect, it } from "vitest";
import { img, unsafe_img } from "../../builder";

describe("Security: SSRF Protection in Builder", () => {
	it("should allow safe external URLs", () => {
		expect(() => img("https://example.com/image.png")).not.toThrow();
	});

	it("should allow data URLs", () => {
		expect(() => img("data:image/png;base64,iVBORw0KGgo=")).not.toThrow();
	});

	it("should block private network IPs (10.x.x.x)", () => {
		// We set NODE_ENV to production to trigger validation
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "production";
		try {
			expect(() => img("http://10.0.0.1/secret.png")).toThrow(
				/OGX Security: Invalid or unsafe image URL/,
			);
		} finally {
			process.env.NODE_ENV = originalEnv;
		}
	});

	it("should block localhost in production", () => {
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "production";
		try {
			expect(() => img("http://localhost/image.png")).toThrow(
				/OGX Security: Invalid or unsafe image URL/,
			);
			expect(() => img("http://127.0.0.1/image.png")).toThrow(
				/OGX Security: Invalid or unsafe image URL/,
			);
		} finally {
			process.env.NODE_ENV = originalEnv;
		}
	});

	it("should block cloud metadata endpoints", () => {
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "production";
		try {
			expect(() => img("http://169.254.169.254/latest/meta-data/")).toThrow(
				/OGX Security: Invalid or unsafe image URL/,
			);
		} finally {
			process.env.NODE_ENV = originalEnv;
		}
	});

	it("should allow bypass with unsafe_img", () => {
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "production";
		try {
			expect(() =>
				unsafe_img("http://169.254.169.254/latest/meta-data/"),
			).not.toThrow();
		} finally {
			process.env.NODE_ENV = originalEnv;
		}
	});
});
