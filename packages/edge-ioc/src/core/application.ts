export interface IHeaders {
  get(name: string): string | null | undefined;
  set(name: string, value: string): void;
  has(name: string): boolean;
  delete(name: string): void;
  entries(): IterableIterator<[string, string]>;
}

export interface IFormData {
  get<T = any>(name: string): T | undefined;
  set<T = any>(name: string, value: T): void;
  has(name: string): boolean;
  delete(name: string): void;
  entries(): IterableIterator<[string, any]>;
}

export interface IRequest {
  readonly method: string;
  readonly url: string;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  text(): Promise<string>;
  json<T>(): Promise<T>;
  formData(): Promise<IFormData>;
  headers: IHeaders;
}

export interface IApplication {
  handleHttpRequest<T = any>(request: IRequest): Promise<T> | T;
}
