import type { FontConfig } from "./types";

/**
 * Global registry for fonts to avoid reloading and simplify configuration
 */
export class FontRegistry {
	private static instance: FontRegistry;
	private fonts: FontConfig[] = [];

	private constructor() {}

	static getInstance(): FontRegistry {
		if (!FontRegistry.instance) {
			FontRegistry.instance = new FontRegistry();
		}
		return FontRegistry.instance;
	}

	/**
	 * Register one or more fonts to be available globally
	 */
	register(font: FontConfig | FontConfig[]): void {
		const fontList = Array.isArray(font) ? font : [font];

		for (const f of fontList) {
			const exists = this.fonts.some(
				(ext) =>
					ext.name === f.name &&
					ext.weight === f.weight &&
					ext.style === f.style,
			);
			if (!exists) {
				this.fonts.push(f);
			}
		}
	}

	/**
	 * Helper to register Inter fonts with specified weights (local files)
	 * Only works in Bun/Node without bundlers
	 * @deprecated Use registerInterFromUrl() for universal compatibility. This method will be removed in v1.0.0
	 */
	async registerInter(
		weights: (300 | 400 | 500 | 600 | 700)[] = [400, 700],
	): Promise<void> {
		const { loadInterFont } = await import("./fonts");
		const fonts = await Promise.all(weights.map((w) => loadInterFont(w)));
		this.register(fonts);
	}

	/**
	 * Helper to register Inter fonts from Google Fonts CDN
	 * Works with all bundlers (Next.js, Vite, etc.)
	 */
	async registerInterFromUrl(
		weights: (300 | 400 | 500 | 600 | 700)[] = [400, 700],
	): Promise<void> {
		const { loadInterFromUrl } = await import("./fonts");
		const fonts = await Promise.all(weights.map((w) => loadInterFromUrl(w)));
		this.register(fonts);
	}

	/**
	 * Helper to register any Google Font by name
	 * Works with all bundlers (Next.js, Vite, etc.)
	 */
	async registerGoogleFont(
		fontName: string,
		weights?: (100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900)[],
	): Promise<void> {
		const { loadGoogleFont } = await import("./fonts");
		const fonts = await loadGoogleFont(fontName, weights);
		this.register(fonts);
	}

	/**
	 * Helper to register a font from a local file
	 * Works in Node.js environments (Route Handlers, API routes)
	 */
	async registerFontFromFile(
		path: string,
		options: {
			name: string;
			weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
			style?: "normal" | "italic";
		},
	): Promise<void> {
		const { loadFontFromFile } = await import("./fonts");
		const font = await loadFontFromFile(path, options);
		this.register(font);
	}

	/**
	 * Get all registered fonts
	 */
	getFonts(): FontConfig[] {
		return [...this.fonts];
	}

	/**
	 * Clear the registry
	 */
	clear(): void {
		this.fonts = [];
	}
}

export const fontRegistry = FontRegistry.getInstance();
