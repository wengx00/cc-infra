import { IHeaders } from 'edge-ioc';

export default class Headers implements IHeaders {
  private headers: Map<string, string>;

  constructor(headers: Record<string, string | undefined | string[]>) {
    this.headers = new Map(
      Object.entries(headers)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [
          key,
          Array.isArray(value) ? value.join(', ') : value,
        ]),
    ) as any;
  }

  get(name: string): string | undefined {
    const value = this.headers.get(name.toLowerCase());
    return value;
  }

  set(name: string, value: string): void {
    this.headers.set(name.toLowerCase(), value);
  }

  has(name: string): boolean {
    return this.headers.has(name.toLowerCase());
  }

  delete(name: string): void {
    this.headers.delete(name.toLowerCase());
  }

  entries(): IterableIterator<[string, string]> {
    return this.headers.entries();
  }
}
