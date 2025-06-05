import { Application, Router } from "@oak/oak";
import { ShortenUrl } from "./usecase/shorten_url.ts";
import { MemoryUrlRepository } from "./infra/memory_url_repository.ts";

const repo = new MemoryUrlRepository();
const useCase = new ShortenUrl(repo);

const router = new Router();

router
  .get("/healthcheck", (ctx) => {
    ctx.response.type = "text/plain";
    ctx.response.body = "I'm Fine";
  })
  .get("/count", async (ctx) => {
    const count = await useCase.count();
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = { count };
  })
  .post("/shorten", async (ctx) => {
    const body = ctx.request.body({ type: "json" });
    const { url: original } = await body.value;
    const short = await useCase.execute(original);
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = { short };
  })
  .get("/:short", async (ctx) => {
    const short = ctx.params.short!;
    const original = await repo.find(short);
    if (original) {
      ctx.response.type = "text/plain";
      ctx.response.body = original;
    } else {
      ctx.response.status = 404;
      ctx.response.body = "Not Found";
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });
