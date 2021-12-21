// Project
import { Func, PredicatePromise } from "./types";

/**
 * Creates a function that applies the `morphism` if the `predicate` returns `true`.
 *
 * @param {PredicatePromise<T>} predicate - Determines whether or not to invoke the `morphism`.
 * @param {Func<T, U>} morphism - The morphism.
 * @returns {Func<T, Promise<T | U>>} A function that takes a value and returns a `Promise`.
 */
export function invokeIf<T, U>(predicate: PredicatePromise<T>, morphism: Func<T, U>): Func<T, Promise<T | U>> {
  return value => Promise.resolve(predicate(value))
    .then(result => (result === true ? morphism(value) : value));
}
