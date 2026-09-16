export type ClassValue = string | number | false | null | undefined

/**
 * Join truthy class values into a single string.
 * Accepts strings, numbers (for callers that legitimately pass e.g. 0),
 * and the falsy values usually used for conditional classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter((v): v is string | number => v !== false && v != null && v !== '').join(' ')
}