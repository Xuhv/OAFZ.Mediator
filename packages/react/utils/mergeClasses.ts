export function mergeClasses(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
