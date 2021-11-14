// Project
import { Func, OnFulfilled } from "./types";

/**
 * Composes two functions; applying `f` before `g`.
 *
 * @param {OnFulfilled<A, B>} f - The first function.
 * @param {OnFulfilled<B, C>} g - The second function.
 * @returns {Func<A | PromiseLike<A>, Promise<A | B | C>>} A function that takes a value or promise-like value and
 * returns the result of the piped functions.
 */
export function pipeThen<A, B, C>(
  f: OnFulfilled<A, B>,
  g: OnFulfilled<B, C>
): Func<A | PromiseLike<A>, Promise<A | B | C>> {
  return promise => Promise.resolve(promise)
    .then(f)
    .then(g);
}
