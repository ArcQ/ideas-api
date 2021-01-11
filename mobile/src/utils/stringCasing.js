export const snakeToCamel = (str) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', ''),
  );

export function camelToSnake(s) {
  return s
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();
}

export function titleCasing(s) {
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}
