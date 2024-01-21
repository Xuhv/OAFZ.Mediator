export function mergeRefs<T>(...refs: React.Ref<T>[]) {
  return (value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') ref(value);
      else if (ref) {
        // @ts-expect-error
        ref.current = value;
      }
    });
  };
}
