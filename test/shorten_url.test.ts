import { describe, it, expect } from 'vitest';
import { ShortenUrl } from '../src/usecase/shorten_url.ts';
import { MemoryUrlRepository } from '../src/infra/memory_url_repository.ts';

describe('ShortenUrl', () => {
  it('returns shortened url and can retrieve original', async () => {
    const repo = new MemoryUrlRepository();
    const useCase = new ShortenUrl(repo);
    const original = 'https://example.com';
    const short = await useCase.execute(original);
    expect(short).toBeDefined();
    const found = await repo.find(short);
    expect(found).toBe(original);
  });
});
