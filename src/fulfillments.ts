// Project
import { PromiseConstructor } from "./types";
import { zipPromiseWith } from "./zipPromiseWith";

/**
 * Extracts from a list of {@link Promise} all of the `fulfilled` elements in extracted order.
 *
 * @param {Promise<T>[]} promises - List of promises.
 * @param {PromiseConstructor} [PromiseCtor=Promise] - Optional Promise constructor implementation.
 * @returns {Promise<T[]>} List of the fulfilled values.
 */
export function fulfillments<T>(promises: Promise<T>[], PromiseCtor: PromiseConstructor = Promise): Promise<T[]> {
  return promises.reduce<Promise<T[]>>(
    zipPromiseWith(
      (values, value) => values.concat(value),
      (values, _value) => values
    ),
    PromiseCtor.resolve([])
  );
}
