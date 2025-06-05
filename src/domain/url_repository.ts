export interface UrlRepository {
  save(url: string): Promise<string>;
  find(short: string): Promise<string | null>;
}
