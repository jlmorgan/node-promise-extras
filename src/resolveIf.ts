// Project
import { BindPromise, FuncPromise, PredicatePromise, PromiseConstructor } from "./types";

/**
 * Creates a function that resolves with the result of the `resolution` if the `predicate` returns `true`.
 *
 * @param {PredicatePromise<E>} predicate - Determines whether or not to resolve the rejected `Promise`.
 * @param {FuncPromise<E, T>} resolution - Provides the resolution for the given `value`.
 * @param {PromiseConstructor} [PromiseCtor=Promise] - Optional Promise constructor implementation.
 * @return {BindPromise<E, T>} A function that takes a rejected value and returns a `Promise`.
 */
export function resolveIf<E, T>(
  predicate: PredicatePromise<E>,
  resolution: FuncPromise<E, T>,
  PromiseCtor: PromiseConstructor = Promise
): BindPromise<E, T> {
  return value => PromiseCtor.resolve(value)
    .then(predicate)
    .then(result => (result === true ?
      PromiseCtor.resolve(resolution(value)) :
      PromiseCtor.reject(value)
    ));
}
