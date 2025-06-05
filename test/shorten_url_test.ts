import { assertEquals, assert } from "https://deno.land/std/assert/mod.ts";
import { ShortenUrl } from "../src/usecase/shorten_url.ts";
import { MemoryUrlRepository } from "../src/infra/memory_url_repository.ts";

// 短縮URLが取得できることを確認
Deno.test("returns shortened url and can retrieve original", async () => {
  const repo = new MemoryUrlRepository();
  const useCase = new ShortenUrl(repo);
  const original = "https://example.com";
  const short = await useCase.execute(original);
  assert(short);
  const found = await useCase.resolve(short);
  assertEquals(found, original);
});

// 同じURLを短縮した場合は同じコードになることを確認
Deno.test("returns same code for duplicate url", async () => {
  const repo = new MemoryUrlRepository();
  const useCase = new ShortenUrl(repo);
  const url = "https://example.com/page";
  const first = await useCase.execute(url);
  const second = await useCase.execute(url);
  assertEquals(first, second);
  const found = await useCase.resolve(first);
  assertEquals(found, url);
});

// エンコードとデコードの整合性をチェック
Deno.test("encode and decode numbers correctly", () => {
  const repo = new MemoryUrlRepository();
  for (let i = 1; i < 100; i++) {
    const code = repo.encode(i);
    assertEquals(repo.decode(code), i);
  }
});

// count メソッドが保存されているURL数を返すことを確認
Deno.test("returns count of stored urls", async () => {
  const repo = new MemoryUrlRepository();
  const useCase = new ShortenUrl(repo);
  const urls = ["https://a.com", "https://b.com"];
  for (const url of urls) {
    await useCase.execute(url);
  }
  const count = await useCase.count();
  assertEquals(count, urls.length);
});
