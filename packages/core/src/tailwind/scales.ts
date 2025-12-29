/**
 * Tailwind spacing scale
 * https://tailwindcss.com/docs/customizing-spacing
 */
export const spacing: Record<string, number> = {
	"0": 0,
	px: 1,
	"0.5": 2,
	"1": 4,
	"1.5": 6,
	"2": 8,
	"2.5": 10,
	"3": 12,
	"3.5": 14,
	"4": 16,
	"5": 20,
	"6": 24,
	"7": 28,
	"8": 32,
	"9": 36,
	"10": 40,
	"11": 44,
	"12": 48,
	"14": 56,
	"16": 64,
	"20": 80,
	"24": 96,
	"28": 112,
	"32": 128,
	"36": 144,
	"40": 160,
	"44": 176,
	"48": 192,
	"52": 208,
	"56": 224,
	"60": 240,
	"64": 256,
	"72": 288,
	"80": 320,
	"96": 384,
};

/**
 * Font size scale
 */
export const fontSize: Record<string, [number, number]> = {
	xs: [12, 16],
	sm: [14, 20],
	base: [16, 24],
	lg: [18, 28],
	xl: [20, 28],
	"2xl": [24, 32],
	"3xl": [30, 36],
	"4xl": [36, 40],
	"5xl": [48, 48],
	"6xl": [60, 60],
	"7xl": [72, 72],
	"8xl": [96, 96],
	"9xl": [128, 128],
};

/**
 * Font weight scale
 */
export const fontWeight: Record<string, number> = {
	thin: 100,
	extralight: 200,
	light: 300,
	normal: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
	extrabold: 800,
	black: 900,
};

/**
 * Border radius scale
 */
export const borderRadius: Record<string, number | string> = {
	none: 0,
	sm: 2,
	"": 4,
	md: 6,
	lg: 8,
	xl: 12,
	"2xl": 16,
	"3xl": 24,
	full: 9999,
};

/**
 * Opacity scale
 */
export const opacity: Record<string, number> = {
	"0": 0,
	"5": 0.05,
	"10": 0.1,
	"15": 0.15,
	"20": 0.2,
	"25": 0.25,
	"30": 0.3,
	"35": 0.35,
	"40": 0.4,
	"45": 0.45,
	"50": 0.5,
	"55": 0.55,
	"60": 0.6,
	"65": 0.65,
	"70": 0.7,
	"75": 0.75,
	"80": 0.8,
	"85": 0.85,
	"90": 0.9,
	"95": 0.95,
	"100": 1,
};

/**
 * Box shadow scale
 */
export const boxShadow: Record<string, string> = {
	sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
	"": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
	md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
	lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
	xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
	"2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
	inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
	none: "0 0 #0000",
};
