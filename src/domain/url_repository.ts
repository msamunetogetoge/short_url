// URLを保存・検索するためのリポジトリのインターフェース
export interface UrlRepository {
  // URLを保存して短縮コードを返す
  save(url: string): Promise<string>;
  // 短縮コードから元のURLを取得する
  find(short: string): Promise<string | null>;
}
