import { assertEquals, assert } from "./asserts.ts";
import { ShortenUrl } from "../src/usecase/shorten_url.ts";
import { MemoryUrlRepository } from "../src/infra/memory_url_repository.ts";

Deno.test("ShortenUrl returns shortened url and can retrieve original", async () => {
  const repo = new MemoryUrlRepository();
  const useCase = new ShortenUrl(repo);
  const original = "https://example.com";
  const short = await useCase.execute(original);
  assert(short);
  const found = await repo.find(short);
  assertEquals(found, original);
});

