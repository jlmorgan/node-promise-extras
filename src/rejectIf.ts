// Project
import { Func, Predicate } from "./types";

/**
 * Creates a function that rejects with the result of the `rejection` if the `predicate` returns `true`.
 *
 * @param {Predicate<T>} predicate - Determines whether or not to reject the `Promise`.
 * @param {Func<T, E>} rejection - Provides the rejection for the given `value`.
 * @return {Func<T, Promise<T>>} A function that takes a value and returns a `Promise`.
 */
export function rejectIf<T, E>(predicate: Predicate<T>, rejection: Func<T, E>): Func<T, Promise<T>> {
  return value => Promise.resolve(value)
    .then(predicate)
    .then(result => (result === true ?
      Promise.reject(rejection(value)) :
      Promise.resolve(value)
    ));
}
