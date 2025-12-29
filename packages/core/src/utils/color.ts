/**
 * Color utility functions
 */

/**
 * Convert OKLCH color to HEX string
 * Supports format: oklch(L C H) or oklch(L C H / A)
 */
export function normalizeColor(color: string): string {
	if (!color || typeof color !== "string") return color;

	const oklchMatch = color.match(
		/oklch\(\s*([\d.]+%?)\s+([\d.]+%?)\s+([\d.]+(?:deg|grad|rad|turn)?)\s*(?:\/\s*([\d.]+%?))?\s*\)/i,
	);

	if (oklchMatch?.[1] && oklchMatch[2] && oklchMatch[3]) {
		const l = parseNormalized(oklchMatch[1], 1);
		const c = parseNormalized(oklchMatch[2], 0.4);
		const h = parseAngle(oklchMatch[3]);

		return oklchToHex(l, c, h);
	}

	return color;
}

function parseNormalized(val: string, _max: number): number {
	if (val.endsWith("%")) {
		return parseFloat(val) / 100;
	}
	const n = parseFloat(val);
	// If L is e.g. 0.7, it's normalized. If it's e.g. 70, it might be a percentage without %
	// But CSS oklch strictly expects 0-1 for L/C or %
	return n;
}

function parseAngle(val: string): number {
	const v = parseFloat(val);
	if (val.endsWith("rad")) return (v * 180) / Math.PI;
	if (val.endsWith("grad")) return (v * 360) / 400;
	if (val.endsWith("turn")) return v * 360;
	return v;
}

/**
 * OKLCH to HEX conversion
 * Formula from https://bottosson.github.io/posts/oklab/
 */
export function oklchToHex(l: number, c: number, h: number): string {
	const hueRad = (h * Math.PI) / 180;
	const a = c * Math.cos(hueRad);
	const b = c * Math.sin(hueRad);

	// OKLab to Linear sRGB
	const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = l - 0.0894841775 * a - 1.291485548 * b;

	const l_3 = l_ * l_ * l_;
	const m_3 = m_ * m_ * m_;
	const s_3 = s_ * s_ * s_;

	let r = +4.0767416621 * l_3 - 3.3077115913 * m_3 + 0.2309699292 * s_3;
	let g = -1.2684380046 * l_3 + 2.6097574011 * m_3 - 0.3413193965 * s_3;
	let b_ = -0.0041960863 * l_3 - 0.7034186147 * m_3 + 1.707614701 * s_3;

	// Linear to sRGB (gamma correction)
	const f = (x: number) =>
		x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;

	// Clamp values
	r = Math.max(0, Math.min(1, r));
	g = Math.max(0, Math.min(1, g));
	b_ = Math.max(0, Math.min(1, b_));

	const ri = Math.round(f(r) * 255);
	const gi = Math.round(f(g) * 255);
	const bi = Math.round(f(b_) * 255);

	const toHex = (n: number) => n.toString(16).padStart(2, "0");
	return `#${toHex(ri)}${toHex(gi)}${toHex(bi)}`.toUpperCase();
}
