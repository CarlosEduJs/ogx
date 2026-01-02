/**
 * Simple in-memory cache for generated images
 */
export class SnapshotCache {
	private static instance: SnapshotCache;
	private cache = new Map<string, { data: any; timestamp: number }>();
	private ttl: number = 0; // Cache TTL in milliseconds, 0 means no expiration

	private constructor() {}

	static getInstance(): SnapshotCache {
		if (!SnapshotCache.instance) {
			SnapshotCache.instance = new SnapshotCache();
		}
		return SnapshotCache.instance;
	}

	/**
	 * Set cache TTL
	 */
	setTTL(milliseconds: number): void {
		this.ttl = milliseconds;
	}

	/**
	 * Serialize config to string for hashing
	 */
	private serializeConfig(config: any): string {
		return JSON.stringify(config, (key, value) => {
			if (typeof value === "function") return undefined;
			if (key === "debug") return undefined;
			return value;
		});
	}

	/**
	 * Calculate a secure hash for a configuration object using SHA-256
	 * Uses Web Crypto API -> available in Node 18+ and browsers
	 */
	async getHashAsync(config: any): Promise<string> {
		const str = this.serializeConfig(config);

		try {
			// Use Web Crypto API for SHA-256
			const encoder = new TextEncoder();
			const data = encoder.encode(str);
			const hashBuffer = await crypto.subtle.digest("SHA-256", data);
			const hashArray = Array.from(new Uint8Array(hashBuffer));
			return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
		} catch {
			// Fallback to djb2 if crypto is not available
			return this.getHash(config);
		}
	}

	/**
	 * Calculate a hash for a configuration object (sync)
	 * Uses djb2 algorithm - fast but has higher collision probability
	 * Note: Cache v2 uses FNV-1a (fnv1a/fastHash) for better performance
	 */
	getHash(config: any): string {
		const str = this.serializeConfig(config);

		// djb2 hash (32-bit) - fallback for sync usage
		let hash = 5381;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = ((hash << 5) + hash) ^ char;
		}
		return `djb2-${(hash >>> 0).toString(16)}`;
	}

	/**
	 * Get an item from cache
	 */
	get(hash: string): any | null {
		const item = this.cache.get(hash);
		if (!item) return null;

		if (this.ttl > 0 && Date.now() - item.timestamp > this.ttl) {
			this.cache.delete(hash);
			return null;
		}

		return item.data;
	}

	/**
	 * Store an item in cache
	 */
	set(hash: string, data: any): void {
		this.cache.set(hash, {
			data,
			timestamp: Date.now(),
		});
	}

	/**
	 * Clear the cache
	 */
	clear(): void {
		this.cache.clear();
	}

	/**
	 * Get cache size (for monitoring)
	 */
	get size(): number {
		return this.cache.size;
	}
}

export const snapshotCache = SnapshotCache.getInstance();
