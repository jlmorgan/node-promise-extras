// Project
import { Func, OnFulfilled, PromiseConstructor } from "./types";

/**
 * Composes two functions; applying `f` before `g`.
 *
 * @param {OnFulfilled<A, B>} f - The first function.
 * @param {OnFulfilled<B, C>} g - The second function.
 * @param {PromiseConstructor} [PromiseCtor=Promise] - Optional Promise constructor implementation.
 * @returns {Func<A | PromiseLike<A>, Promise<A | B | C>>} A function that takes a value or promise-like value and
 * returns the result of the piped functions.
 */
export function pipeThen<A, B, C>(
  f: OnFulfilled<A, B>,
  g: OnFulfilled<B, C>,
  PromiseCtor: PromiseConstructor = Promise
): Func<A | PromiseLike<A>, Promise<A | B | C>> {
  return promise => PromiseCtor.resolve(promise)
    .then(f)
    .then(g);
}
