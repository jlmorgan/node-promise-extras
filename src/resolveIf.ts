// Project
import { Func, Predicate } from "./types";

/**
 * Creates a function that resolves with the result of the `resolution` if the `predicate` returns `true`.
 *
 * @param {Predicate<E>} predicate - Determines whether or not to resolve the rejected `Promise`.
 * @param {Func<E, T>} resolution - Provides the resolution for the given `value`.
 * @return {Func<E, Promise<T>>} A function that takes a rejected value and returns a `Promise`.
 */
export function resolveIf<E, T>(predicate: Predicate<E>, resolution: Func<E, T>): Func<E, Promise<T>> {
  return value => Promise.resolve(value)
    .then(predicate)
    .then(result => (result === true ?
      Promise.resolve(resolution(value)) :
      Promise.reject(value)
    ));
}
