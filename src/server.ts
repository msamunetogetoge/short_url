// Oak からアプリケーションとルーターを読み込む
import { Application, Router } from "@oak/oak";
import { ShortenUrl } from "./usecase/shorten_url.ts";
import { MemoryUrlRepository } from "./infra/memory_url_repository.ts";

// メモリ上のリポジトリを生成
const repo = new MemoryUrlRepository();
// URL 短縮のユースケースを初期化
const useCase = new ShortenUrl(repo);

// Oak のルーターを作成
const router = new Router();

router
  // サーバーが動いているか確認するエンドポイント
  .get("/healthcheck", (ctx) => {
    ctx.response.type = "text/plain";
    ctx.response.body = "I'm Fine";
  })
  // 保存されている URL の件数を返す
  .get("/count", async (ctx) => {
    const count = await useCase.count();
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = { count };
  })
  // URL を短縮する
  .post("/shorten", async (ctx) => {
    const body = ctx.request.body({ type: "json" });
    const { url: original } = await body.value;
    const short = await useCase.execute(original);
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = { short };
  })
  // 短縮コードから元の URL を取得する
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

// アプリケーションを起動
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:8000");
// ポート 8000 でサーバーを開始
await app.listen({ port: 8000 });
