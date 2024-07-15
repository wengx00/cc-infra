export class RetError extends Error {
  constructor(
    readonly retcode: number,
    readonly detail: string,
  ) {
    super(detail);
  }
}
