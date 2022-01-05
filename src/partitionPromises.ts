// Project
import { PromiseConstructor } from "./types";
import { zipPromiseWith } from "./zipPromiseWith";

/**
 * Partitions a list of promises into its respective rejections and fulfillments.
 *
 * @param {Promise<T>[]} promises List of promises.
 * @param {PromiseConstructor} [PromiseCtor=Promise] - Optional Promise constructor implementation.
 * @returns {Promise<[E[], T[]]>} A tuple of the rejections and fulfillments.
 */
export function partitionPromises<T, E>(
  promises: Promise<T>[],
  PromiseCtor: PromiseConstructor = Promise
): Promise<[E[], T[]]> {
  return promises.reduce<Promise<[E[], T[]]>>(
    zipPromiseWith(
      (values, value) => [values[0], values[1].concat(value)],
      (values, value) => [values[0].concat(value as E), values[1]]
    ),
    PromiseCtor.resolve([[], []])
  );
}
