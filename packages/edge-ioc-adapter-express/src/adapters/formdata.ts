import { IFormData } from '@cc-infra/edge-ioc';

export default class FormData implements IFormData {
  private formData: Map<string, any>;

  constructor(formData: Record<string, any>) {
    this.formData = new Map(Object.entries(formData));
  }

  get<T>(name: string): T | undefined {
    return this.formData.get(name);
  }

  set<T>(name: string, value: T): void {
    this.formData.set(name, value);
  }

  has(name: string): boolean {
    return this.formData.has(name);
  }

  delete(name: string): void {
    this.formData.delete(name);
  }

  entries(): IterableIterator<[string, any]> {
    return this.formData.entries();
  }
}
