import { UrlRepository } from "../domain/url_repository.ts";

// 62進数でコードを生成するための文字一覧
const BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// メモリ上でURLを管理するリポジトリ実装
export class MemoryUrlRepository implements UrlRepository {
  // URLからIDへのマッピング
  private urlToId = new Map<string, number>();
  // IDからURLへのマッピング
  private idToUrl = new Map<number, string>();
  // 次に割り当てるID
  private counter = 1;

  // URLを保存して短縮コードを返す
  async save(url: string): Promise<string> {
    let id: number;
    if (this.urlToId.has(url)) {
      id = this.urlToId.get(url)!;
    } else {
      id = this.counter++;
      this.urlToId.set(url, id);
      this.idToUrl.set(id, url);
    }
    return this.encode(id);
  }

  // 短縮コードから元のURLを取得する
  async find(short: string): Promise<string | null> {
    const id = this.decode(short);
    return this.idToUrl.get(id) ?? null;
  }

  // 数値IDを62進数の文字列に変換する
  encode(num: number): string {
    if (num === 0) return BASE62[0];
    const base = BASE62.length;
    let n = num;
    const encoded: string[] = [];
    while (n > 0) {
      const rem = n % base;
      encoded.push(BASE62[rem]);
      n = Math.floor(n / base);
    }
    return encoded.reverse().join("");
  }

  // 62進数の文字列を数値IDに変換する
  decode(code: string): number {
    const base = BASE62.length;
    let num = 0;
    for (const ch of code) {
      num = num * base + BASE62.indexOf(ch);
    }
    return num;
  }
}
