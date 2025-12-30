import {
	fontRegistry,
	type OGXConfig,
	ogx,
	type PresetName,
} from "@ogxjs/core";

export type NextOGXConfig<T extends PresetName = PresetName> = OGXConfig<T>;

const fontsRegistered = new Set<number>();

/**
 * Generates an OG image and returns it as a standard Web Response.
 * Perfect for Next.js Route Handlers and Middleware.
 */
export async function ogxResponse<T extends PresetName>(
	config: NextOGXConfig<T>,
	request?: Request,
): Promise<Response> {
	try {
		const anyConfig = config as any;

		// Detect platform from request if provided
		if (request) {
			const { searchParams } = new URL(request.url);
			const platform =
				searchParams.get("platform") ||
				searchParams.get("target") ||
				searchParams.get("p");

			if (platform) {
				anyConfig.platform = platform;
			}
		}

		// Declarative font registration (idempotent)
		if (
			anyConfig.inter &&
			Array.isArray(anyConfig.inter) &&
			anyConfig.inter.length > 0
		) {
			const toRegister = (anyConfig.inter as number[]).filter(
				(w) => !fontsRegistered.has(w),
			);
			if (toRegister.length > 0) {
				await fontRegistry.registerInterFromUrl(toRegister as any);
				for (const w of toRegister) {
					fontsRegistered.add(w);
				}
			}
		}

		const png = await ogx(config);

		const isBuffer = png instanceof Uint8Array;
		const body = isBuffer ? (png as Uint8Array) : JSON.stringify(png);
		const contentType = isBuffer ? "image/png" : "application/json";

		return new Response(body as any, {
			headers: {
				"Content-Type": contentType,
				"Cache-Control": "public, max-age=31536000, immutable",
				...config.options?.headers,
			},
		});
	} catch (error) {
		console.error("OGX Response Error:", error);

		const isProd = process.env.NODE_ENV === "production";
		const errorMessage = isProd
			? "An internal error occurred while generating the image."
			: String(error);

		return new Response(JSON.stringify({ error: errorMessage }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
