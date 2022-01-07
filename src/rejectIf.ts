// Project
import { filterIf } from "./filterIf";
import { BindPromise, Func, PredicatePromise, PromiseConstructor } from "./types";

const negate = <A>(predicate: PredicatePromise<A>) => (value: A) => Promise.resolve(predicate(value))
  .then(result => !result);

/**
 * Creates a function that rejects with the result of the `rejection` if the `predicate` returns `true`.
 *
 * @param {PredicatePromise<T>} predicate - Determines whether or not to reject the `Promise`.
 * @param {Func<T, E>} rejection - Provides the rejection for the given `value`.
 * @param {PromiseConstructor} [PromiseCtor=Promise] - Optional Promise constructor implementation.
 * @return {BindPromise<T, T>} A function that takes a value and returns a `Promise`.
 */
export function rejectIf<T, E>(
  predicate: PredicatePromise<T>,
  rejection: Func<T, E>,
  PromiseCtor: PromiseConstructor = Promise
): BindPromise<T, T> {
  return filterIf(negate(predicate), rejection, PromiseCtor);
}
