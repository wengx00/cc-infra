export default async function tryCatch<T>(promise: Promise<T>): Promise<[T | null, any | null]> {
  try {
    const res = await promise;
    return [res, null];
  } catch (error) {
    return [null, error];
  }
}
