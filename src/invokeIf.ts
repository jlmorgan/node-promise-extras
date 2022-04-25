// Project
import { BindPromise, Func, PredicatePromise } from "./types";

/**
 * Creates a function that applies the `morphism` if the `predicate` returns `true`.
 *
 * @param {PredicatePromise<T>} predicate - Determines whether or not to invoke the `morphism`.
 * @param {Func<T, U>} morphism - The morphism.
 * @returns {BindPromise<T, T | U>} A function that takes a value and returns a `Promise`.
 */
export function invokeIf<T, U>(predicate: PredicatePromise<T>, morphism: Func<T, U>): BindPromise<T, T | U> {
  return value => Promise.resolve(value)
    .then(predicate)
    .then(result => (result === true ? morphism(value) : value));
}
