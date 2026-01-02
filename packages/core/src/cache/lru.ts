/**
 * @ogxjs/core - LRU Cache Implementation
 * Least Recently Used cache with O(1) operations
 *
 * @description
 * High-performance LRU cache using Map + doubly-linked list.
 * - O(1) get, set, delete
 * - Automatic eviction when max size reached
 * - Optional TTL (time-to-live) support
 * - Memory-bounded
 *
 * @version 0.2.0 "Turbo"
 */

// TYPES

interface CacheNode<K, V> {
	key: K;
	value: V;
	timestamp: number;
	prev: CacheNode<K, V> | null;
	next: CacheNode<K, V> | null;
}

export interface LRUCacheOptions<K = unknown, V = unknown> {
	/** Maximum number of items in cache */
	maxSize?: number;
	/** Time-to-live in milliseconds (0 = no expiration) */
	ttl?: number;
	/** Callback when an item is evicted */
	onEvict?: (key: K, value: V) => void;
}

export interface LRUCacheStats {
	size: number;
	maxSize: number;
	hits: number;
	misses: number;
	hitRate: number;
	evictions: number;
}

// LRU CACHE CLASS

/**
 * LRU Cache with O(1) operations
 *
 * @example
 * ```ts
 * const cache = new LRUCache<string, Buffer>({ maxSize: 100, ttl: 60000 });
 *
 * cache.set("image-1", buffer);
 * const result = cache.get("image-1"); // → buffer
 *
 * console.log(cache.stats); // { size: 1, hits: 1, ... }
 * ```
 */
export class LRUCache<K, V> {
	private cache = new Map<K, CacheNode<K, V>>();
	private head: CacheNode<K, V> | null = null;
	private tail: CacheNode<K, V> | null = null;
	private readonly maxSize: number;
	private readonly ttl: number;
	private readonly onEvict?: (key: K, value: V) => void;

	// Stats
	private _hits = 0;
	private _misses = 0;
	private _evictions = 0;

	constructor(options: LRUCacheOptions<K, V> = {}) {
		this.maxSize = options.maxSize ?? 1000;
		this.ttl = options.ttl ?? 0;
		this.onEvict = options.onEvict;
	}

	/**
	 * Get a value from the cache
	 * Moves the item to the front (most recently used)
	 */
	get(key: K): V | undefined {
		const node = this.cache.get(key);

		if (!node) {
			this._misses++;
			return undefined;
		}

		// Check TTL
		if (this.ttl > 0 && Date.now() - node.timestamp > this.ttl) {
			this.delete(key);
			this._misses++;
			return undefined;
		}

		// Move to front
		this.moveToFront(node);
		this._hits++;

		return node.value;
	}

	/**
	 * Set a value in the cache
	 * Evicts least recently used item if at capacity
	 */
	set(key: K, value: V): void {
		const existing = this.cache.get(key);

		if (existing) {
			// Update existing
			existing.value = value;
			existing.timestamp = Date.now();
			this.moveToFront(existing);
			return;
		}

		// Evict if at capacity
		if (this.cache.size >= this.maxSize) {
			this.evictLRU();
		}

		// Create new node
		const node: CacheNode<K, V> = {
			key,
			value,
			timestamp: Date.now(),
			prev: null,
			next: this.head,
		};

		// Update links
		if (this.head) {
			this.head.prev = node;
		}
		this.head = node;

		if (!this.tail) {
			this.tail = node;
		}

		this.cache.set(key, node);
	}

	/**
	 * Check if a key exists (without updating LRU order)
	 */
	has(key: K): boolean {
		const node = this.cache.get(key);
		if (!node) return false;

		// Check TTL
		if (this.ttl > 0 && Date.now() - node.timestamp > this.ttl) {
			this.delete(key);
			return false;
		}

		return true;
	}

	/**
	 * Delete a key from the cache
	 */
	delete(key: K): boolean {
		const node = this.cache.get(key);
		if (!node) return false;

		this.removeNode(node);
		this.cache.delete(key);

		return true;
	}

	/**
	 * Clear the entire cache
	 */
	clear(): void {
		this.cache.clear();
		this.head = null;
		this.tail = null;
		this._hits = 0;
		this._misses = 0;
		this._evictions = 0;
	}

	/**
	 * Get cache size
	 */
	get size(): number {
		return this.cache.size;
	}

	/**
	 * Get cache statistics
	 */
	get stats(): LRUCacheStats {
		const total = this._hits + this._misses;
		return {
			size: this.cache.size,
			maxSize: this.maxSize,
			hits: this._hits,
			misses: this._misses,
			hitRate: total > 0 ? this._hits / total : 0,
			evictions: this._evictions,
		};
	}

	/**
	 * Get all keys (in LRU order, most recent first)
	 */
	keys(): K[] {
		const result: K[] = [];
		let node = this.head;
		while (node) {
			result.push(node.key);
			node = node.next;
		}
		return result;
	}

	/**
	 * Iterate over entries (in LRU order)
	 */
	*entries(): Generator<[K, V]> {
		let node = this.head;
		while (node) {
			yield [node.key, node.value];
			node = node.next;
		}
	}

	/**
	 * Prune expired entries (if TTL is set)
	 * Call periodically for long-running processes
	 */
	prune(): number {
		if (this.ttl === 0) return 0;

		const now = Date.now();
		let pruned = 0;

		for (const [key, node] of this.cache) {
			if (now - node.timestamp > this.ttl) {
				this.delete(key);
				pruned++;
			}
		}

		return pruned;
	}

	// ═══════════════════════════════════════════════════════════════════════
	// PRIVATE METHODS
	// ═══════════════════════════════════════════════════════════════════════

	/**
	 * Move a node to the front (most recently used)
	 */
	private moveToFront(node: CacheNode<K, V>): void {
		if (node === this.head) return;

		// Remove from current position
		this.removeNode(node);

		// Add to front
		node.prev = null;
		node.next = this.head;

		if (this.head) {
			this.head.prev = node;
		}
		this.head = node;

		if (!this.tail) {
			this.tail = node;
		}
	}

	/**
	 * Remove a node from the linked list (but not from Map)
	 */
	private removeNode(node: CacheNode<K, V>): void {
		if (node.prev) {
			node.prev.next = node.next;
		} else {
			this.head = node.next;
		}

		if (node.next) {
			node.next.prev = node.prev;
		} else {
			this.tail = node.prev;
		}
	}

	/**
	 * Evict the least recently used item
	 */
	private evictLRU(): void {
		if (!this.tail) return;

		const evicted = this.tail;

		// Call eviction callback
		if (this.onEvict) {
			this.onEvict(evicted.key, evicted.value);
		}

		// Remove from list
		this.removeNode(evicted);
		this.cache.delete(evicted.key);
		this._evictions++;
	}
}

// CONVENIENCE FACTORIES

/**
 * Create a small LRU cache (100 items)
 */
export function createSmallCache<K, V>(ttl = 0): LRUCache<K, V> {
	return new LRUCache({ maxSize: 100, ttl });
}

/**
 * Create a medium LRU cache (1000 items)
 */
export function createMediumCache<K, V>(ttl = 0): LRUCache<K, V> {
	return new LRUCache({ maxSize: 1000, ttl });
}

/**
 * Create a large LRU cache (10000 items)
 */
export function createLargeCache<K, V>(ttl = 0): LRUCache<K, V> {
	return new LRUCache({ maxSize: 10000, ttl });
}
