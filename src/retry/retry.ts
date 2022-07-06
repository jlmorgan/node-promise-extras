// Project
import { PredicatePromise, SupplierPromise } from "../types";
import { defer } from "../defer";
import { OnRetry } from "./OnRetry";
import { RetryError } from "../error/RetryError";
import { RetryOptions } from "./RetryOptions";
import { resolveIf } from "../resolveIf";
import { attempt } from "../attempt";

interface RetryingParams<T, E = never> {
  backOffRate: number;
  intervalMilliseconds: number;
  maxAttempts: number;
  onRetry: OnRetry<E>;
  shouldRetry: PredicatePromise<E>;
  supplier: SupplierPromise<T>;
}

/**
 * Performs a sequence of two actions, discarding the output of the first.
 *
 * @private
 * @param f - First supplier.
 * @param g - Second supplier.
 * @returns The output of the second.
 */
function applySecond<T>(f: SupplierPromise<any>, g: SupplierPromise<T>): Promise<T> {
  return attempt(f)
    .then(g, g);
}

/**
 * Internal retry with fully resolved parameters.
 *
 * @private
 * @param params - Retry parameters.
 * @param attempts - Number of current retry attempts.
 * @param error - Optional error.
 * @returns The result of the `supplier`.
 */
function retrying<T, E = never>(params: RetryingParams<T, E>, attempts = 0, error?: E): Promise<T> {
  const duration = params.intervalMilliseconds * (params.backOffRate ** attempts);

  return attempts >= params.maxAttempts ?
    Promise.reject(new RetryError(params.maxAttempts, error)) :
    Promise.resolve(params.supplier())
      .catch(resolveIf(
        (caughtError: E) => params.shouldRetry(caughtError),
        (caughtError: E) => applySecond(
          () => (attempts > 0 ? params.onRetry(attempts, duration, error) : void 0),
          () => defer<T>(duration)(() => retrying(params, attempts + 1, caughtError))
        )
      ));
}

/**
 * Retry default values.
 */
const retryDefaults = {
  backOffRate: 2,
  intervalMilliseconds: 1000,
  maxAttempts: 3,
  onRetry: () => void 0,
  shouldRetry: () => true
};

/**
 * Retries the `supplier` when `errorEquals` returns `true` by waiting `intervalMilliseconds` (`i`) multiplied by the
 * `backOffRate` (`b`) to the power of the number of `attempts` (`a`) (i.e., `i * b ^ a`) made until the `maxAttempts`
 * is reached. For a fully failed example with defaults,
 *
 * 1. Executes `supplier` and fails.
 * 2. Retry after 1 second (1 * 2 ^ 0) and fails.
 * 3. Retry after 2 seconds (1 * 2 ^ 1) and fails.
 * 4. Retry after 4 seconds (1 * 2 ^ 2) and fails.
 * 5. Rejects with failure.
 *
 * @param options - Retry parameters.
 * @returns The result of the `supplier`.
 */
export function retry<T, E>(supplier: SupplierPromise<T>, options: RetryOptions<E> = {}): Promise<T> {
  const {
    backOffRate = retryDefaults.backOffRate,
    intervalMilliseconds = retryDefaults.intervalMilliseconds,
    maxAttempts = retryDefaults.maxAttempts,
    onRetry = retryDefaults.onRetry,
    shouldRetry = retryDefaults.shouldRetry
  } = options;

  return retrying({
    backOffRate,
    intervalMilliseconds,
    maxAttempts,
    onRetry,
    shouldRetry,
    supplier
  });
}
