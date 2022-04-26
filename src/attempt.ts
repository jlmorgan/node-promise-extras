import { SupplierPromise } from "./types";

/**
 * Captures the possible {@link Error} in a rejection; otherwise, the fulfilled `value`.
 *
 * @param {SupplierPromise<T>} supplier - A supplier of a value.
 * @returns {Promise<T>} The fulfilled supplied value or a rejection of the error.
 */
export function attempt<T>(supplier: SupplierPromise<T>): Promise<T> {
  try {
    return Promise.resolve(supplier());
  } catch (error) {
    return Promise.reject(error);
  }
}
