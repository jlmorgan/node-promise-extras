// Project
import { BindPromise, Func, PredicatePromise } from "./types";

/**
 * Creates a function that rejects with the result of the `rejection` if the `predicate` returns `false`.
 *
 * @param {PredicatePromise<T>} predicate - Determines whether or not to filter the `Promise`.
 * @param {Func<T, E>} rejection - Provides the rejection for the given `value`.
 * @return {BindPromise<T, T>} A function that takes a value and returns a `Promise`.
 */
export function filterIf<T, E>(predicate: PredicatePromise<T>, rejection: Func<T, E>): BindPromise<T, T> {
  return value => Promise.resolve(predicate(value))
    .then(result => (result === true ?
      Promise.resolve(value) :
      Promise.reject(rejection(value))
    ));
}
