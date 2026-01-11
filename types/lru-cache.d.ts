declare module 'lru-cache' {
  export class LRUCache<K = unknown, V = unknown> {
    constructor(options?: {
      max?: number;
      ttl?: number;
    });
    set(key: K, value: V): void;
    get(key: K): V | undefined;
  }
}
