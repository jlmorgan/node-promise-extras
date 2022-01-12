import { Func, PromiseConstructor, SupplierPromise } from "./types";

/**
 * Creates a function that executes a `supplier` after waiting the `duration` in milliseconds and returns a
 * {@link Promise} of the result.
 *
 * @param {number} duration - Duration of time in milliseconds to wait before execution.
 * @param {PromiseConstructor} [PromiseCtor=Promise] - Optional Promise constructor implementation.
 * @returns {Func<SupplierPromise<T>, Promise<T>>} A function that takes a supplier and returns a promise of the result
 * after waiting the `duration`.
 */
export function defer<T>(
  duration: number,
  PromiseCtor: PromiseConstructor = Promise
): Func<SupplierPromise<T>, Promise<T>> {
  return supplier => new PromiseCtor(
    resolve => setTimeout(() => resolve(supplier()), duration)
  );
}
