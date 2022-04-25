import { PromiseConstructor, SupplierPromise } from "./types";

/**
 * Captures the possible {@link Error} in a rejection; otherwise, the fulfilled `value`.
 *
 * @param {SupplierPromise<T>} supplier - A supplier of a value.
 * @param {PromiseConstructor} [PromiseCtor=Promise] - Optional Promise constructor implementation.
 * @returns {Promise<T>} The fulfilled supplied value or a rejection of the error.
 */
export function attempt<T>(supplier: SupplierPromise<T>, PromiseCtor: PromiseConstructor = Promise): Promise<T> {
  try {
    return PromiseCtor.resolve(supplier());
  } catch (error) {
    return PromiseCtor.reject(error);
  }
}
