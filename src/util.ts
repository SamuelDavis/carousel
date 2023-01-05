export function styles(variables: object): string {
  return Object.entries(variables).reduce(
    (acc, [key, value]) => `${acc}${key}:${value};`,
    ""
  );
}
