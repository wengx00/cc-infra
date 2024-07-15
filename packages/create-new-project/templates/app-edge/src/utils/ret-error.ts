export class RetError extends Error {
  constructor(
    readonly retcode: number,
    readonly detail: string,
  ) {
    super(detail);
  }
}

export const errcode = {
  INTERNAL_ERROR: 500000,
  UNAUTHORIZED: 400001,
  FORBIDDEN: 400002,
  NOT_FOUND: 400004,
  BAD_REQUEST: 400000,
};
