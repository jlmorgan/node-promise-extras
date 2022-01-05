import { PredicatePromise, PromiseConstructor, SupplierPromise } from "../types";
import { OnRetry } from "./OnRetry";

export interface RetryParams<T, E = never> {
  /**
   * Base back off rate used to compute the delay before the next retry.
   *
   * @default 2
   */
  backOffRate?: number;

  /**
   * Determines whether or not retries should continue based on the rejected/caught value.
   *
   * @default - Always returns true.
   */
  errorEquals?: PredicatePromise<E>;

  /**
   * Base interval to delay before retrying in milliseconds.
   *
   * @default 1000
   */
  intervalMilliseconds?: number;

  /**
   * Maximum number of retry attempts to make.
   *
   * @default 3
   */
  maxAttempts?: number;

  /**
   * Side effect to execute upon each retry attempt.
   *
   * @default - Do nothing.
   */
  onRetry?: OnRetry<E>;

  /**
   * Optional Promise constructor implementation.
   *
   * @default Promise
   */
  PromiseCtor?: PromiseConstructor;

  /**
   * Value supplying function to execute for each retry attempt.
   */
  supplier: SupplierPromise<T>;
}
