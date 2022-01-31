// eslint-disable-next-line @typescript-eslint/no-var-requires
const PersistanceCache = require('persistent-cache');

export class CachePersistance {
  cache: any;

  constructor(ttlSeconds: number) {
    this.cache = new PersistanceCache({
      base: '.cache',
      name: 'cache',
      duration: ttlSeconds * 1000,
    });
  }

  async getSync(key: string) {
    return this.cache.getSync(key);
  }

  async putSync(key: string, obj: any) {
    return await this.cache.putSync(key, obj);
  }
}
