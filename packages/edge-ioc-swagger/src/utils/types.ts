export interface SwaggerFactoryOptions {
  commonResult?: {
    schema: Record<string, Record<string, string>>;
    dataKey: string;
  };
}
