// Project
import { zipPromiseWith } from "./zipPromiseWith";

/**
 * Extracts from a list of {@link Promise} all of the `fulfilled` elements in extracted order.
 *
 * @param {Promise<T>[]} promises - List of promises.
 * @returns {Promise<T[]>} List of the fulfilled values.
 */
export function fulfillments<T>(promises: Promise<T>[]): Promise<T[]> {
  return promises.reduce<Promise<T[]>>(
    zipPromiseWith(
      (values, value) => values.concat(value),
      (values, _value) => values
    ),
    Promise.resolve([])
  );
}
