// Project
import { zipPromiseWith } from "./zipPromiseWith";

/**
 * Extracts from a list of {@link Promise} all of the `rejected` elements in extracted order.
 *
 * @param {Promise<T>[]} promises - List of promises.
 * @returns {Promise<E[]>} List of the rejected values.
 */
export function rejections<T, E>(promises: Promise<T>[]): Promise<E[]> {
  return promises.reduce<Promise<E[]>>(
    zipPromiseWith(
      (values, _value) => values,
      (values, value) => values.concat(value as E)
    ),
    Promise.resolve([])
  );
}
