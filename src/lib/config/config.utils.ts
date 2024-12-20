import { isArray, isObject } from '../dag.utils';

export function deepMerge(base: unknown, override: unknown) {
  if (isObject(base)) {
    if (isObject(override)) {
      const obj = {};
      for (const key in base) {
        obj[key as keyof typeof obj] = key in override ? override[key as keyof typeof override] : base[key as keyof typeof base];
      }
      return obj;
    }
  } else if (isArray(base)) {
    if (isArray(override)) {
      return [...base, ...override];
    }
  } else {
    return override;
  }
}
