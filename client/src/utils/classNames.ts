export function classNames(...classes: Array<string | undefined>): string {
  if (Array.isArray(classes)) {
    return classes.filter((cl) => cl !== undefined).join(" ");
  }

  return classes;
}
