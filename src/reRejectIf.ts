// Project
import { BindPromise, Func, Predicate } from "./types";

/**
 * Creates a function that rejects with the result of the `morphism` if the `predicate` returns `true` such as
 * replacing one error type for another.
 *
 * @param predicate - Determines whether or not to transform the rejected value.
 * @param morphism - Transforms the rejected value.
 * @return A function that takes a rejected value and returns another rejection.
 */
export function reRejectIf<E, T>(predicate: Predicate<E>, morphism: Func<E, E>): BindPromise<E, T> {
  return value => (predicate(value) === true ?
    Promise.reject(morphism(value)) :
    Promise.reject(value)
  );
}
