// Project
import { PredicatePromise } from "../types";
import { OnRetry } from "./OnRetry";

export interface RetryOptions<E = never> {
  /**
   * Base back off rate used to compute the delay before the next retry.
   *
   * @default 2
   */
  backOffRate?: number;

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
   * Determines whether or not should retry based on the rejected/caught value.
   *
   * @default - Always returns true.
   */
  shouldRetry?: PredicatePromise<E>;
}
