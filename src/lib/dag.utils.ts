export function isArray(data: unknown): data is Array<unknown> {
  return Array.isArray(data);
}

export function isObject(data: unknown): data is object {
  return data === Object(data);
}
