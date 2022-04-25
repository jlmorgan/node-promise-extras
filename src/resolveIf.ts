// Project
import { BindPromise, FuncPromise, PredicatePromise } from "./types";

/**
 * Creates a function that resolves with the result of the `resolution` if the `predicate` returns `true`.
 *
 * @param {PredicatePromise<E>} predicate - Determines whether or not to resolve the rejected `Promise`.
 * @param {FuncPromise<E, T>} resolution - Provides the resolution for the given `value`.
 * @return {BindPromise<E, T>} A function that takes a rejected value and returns a `Promise`.
 */
export function resolveIf<E, T>(predicate: PredicatePromise<E>, resolution: FuncPromise<E, T>): BindPromise<E, T> {
  return value => Promise.resolve(value)
    .then(predicate)
    .then(result => (result === true ?
      Promise.resolve(resolution(value)) :
      Promise.reject(value)
    ));
}
