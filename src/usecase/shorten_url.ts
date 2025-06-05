import { UrlRepository } from '../domain/url_repository.ts';

export class ShortenUrl {
  constructor(private repository: UrlRepository) {}

  async execute(url: string): Promise<string> {
    return await this.repository.save(url);
  }
}
