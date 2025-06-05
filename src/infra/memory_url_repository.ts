import { UrlRepository } from '../domain/url_repository.ts';

export class MemoryUrlRepository implements UrlRepository {
  private data = new Map<string, string>();

  async save(url: string): Promise<string> {
    const short = crypto.randomUUID().slice(0, 8);
    this.data.set(short, url);
    return short;
  }

  async find(short: string): Promise<string | null> {
    return this.data.get(short) || null;
  }
}
