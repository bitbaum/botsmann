declare module "lru-cache" {
  export class LRUCache<K = any, V = any> {
    constructor(options?: { max?: number; ttl?: number });
    set(key: K, value: V): void;
    get(key: K): V | undefined;
  }
}
