import { UrlRepository } from "../domain/url_repository.ts";
// 短縮URLを生成・解決するユースケースを表すクラス

export class ShortenUrl {
  constructor(private repository: UrlRepository) {}
  // URLを短縮してコードを返す

  async execute(url: string): Promise<string> {
    return await this.repository.save(url);
  }
  // コードからURLを取得する

  async resolve(code: string): Promise<string | null> {
    return await this.repository.find(code);
  }
}
