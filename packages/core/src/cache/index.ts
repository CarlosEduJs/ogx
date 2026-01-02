/**
 * @ogxjs/core - Cache Module
 * High-performance caching system
 *
 * @version 0.2.0 "Turbo"
 */

// Hash functions
export {
	fastHash,
	fastHashHex,
	fnv1a,
	fnv1aHex,
	hashComposite,
	hashObject,
} from "./hash";

// LRU Cache
export {
	createLargeCache,
	createMediumCache,
	createSmallCache,
	LRUCache,
	type LRUCacheOptions,
	type LRUCacheStats,
} from "./lru";

// Snapshot Cache
export {
	configureSnapshotCache,
	getSnapshotCache,
	type SnapshotCacheOptions,
	type SnapshotCacheStats,
	SnapshotCacheV2,
	snapshotCache,
} from "./snapshot";
