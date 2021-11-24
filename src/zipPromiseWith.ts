// Project
import { Func2 } from "./types";

/**
 * Zips the two promises.
 *
 * @param {Func2<B, A, C>} f - Zips the fulfilled value of `Promise<B>` with the fulfilled value of `Promise<A>`.
 * @param {Func2<B, E, C>} g - Zips the fulfilled value of `Promise<B>` with the rejected value of `Promise<A>`.
 * @return {Func2<Promise<B>, Promise<A>, Promise<C>>} A function that takes the fulfilled `Promise<B>` and `Promise<A>`
 * and returns a {@link Promise} of the zipped result.
 */
export function zipPromiseWith<A, B, C, E>(
  f: Func2<B, A, C>,
  g: Func2<B, E, C>
): Func2<Promise<B>, Promise<A>, Promise<C>> {
  return (b, a) => a.then(
    valueA => b.then(valueB => f(valueB, valueA)),
    error => b.then(valueB => g(valueB, error as E))
  );
}
