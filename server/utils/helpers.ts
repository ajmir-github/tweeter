export function exclude<T extends {}>(
  object: T,
  key: keyof T
): Omit<T, keyof T> {
  const { [key]: _, ...rest } = object;
  return rest;
}
