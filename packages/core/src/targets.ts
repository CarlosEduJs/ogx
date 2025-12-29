/**
 * Supported platforms and their standard OG image dimensions
 */
export const TARGET_DIMENSIONS = {
	/** Standard Open Graph (Facebook, LinkedIn, Slack) */
	meta: { width: 1200, height: 630 },
	/** Twitter/X Large Card */
	twitter: { width: 1200, height: 600 },
	/** Instagram Post / Square target */
	instagram: { width: 1080, height: 1080 },
	/** WhatsApp/Telegram (preferred 1.91:1 but often square-cropped) */
	whatsapp: { width: 1200, height: 630 },
	/** Pinterest (2:3 aspect ratio) */
	pinterest: { width: 1000, height: 1500 },
	/** E-commerce / Marketplaces */
	marketplace: { width: 1000, height: 1000 },
	/** YouTube Thumbnail */
	youtube: { width: 1280, height: 720 },
} as const;

export type Platform = keyof typeof TARGET_DIMENSIONS;

/**
 * Get dimensions for a platform
 */
export function getPlatformDimensions(platform: Platform) {
	return TARGET_DIMENSIONS[platform] || TARGET_DIMENSIONS.meta;
}
