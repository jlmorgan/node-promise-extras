// Project
import { PredicatePromise, SupplierPromise } from "../types";
import { defer } from "../defer";
import { OnRetry } from "./OnRetry";
import { RetryError } from "../error/RetryError";
import { RetryParams } from "./RetryParams";
import { resolveIf } from "../resolveIf";

interface RetryingParams<T, E = never> {
  backOffRate: number;
  errorEquals: PredicatePromise<E>;
  intervalMilliseconds: number;
  maxAttempts: number;
  onRetry: OnRetry<E>;
  supplier: SupplierPromise<T>;
}

function retrying<T, E = never>(params: RetryingParams<T, E>, attempts = 0, error?: E): Promise<T> {
  const duration = params.intervalMilliseconds * (params.backOffRate ** attempts);

  if (attempts > 0) {
    params.onRetry(attempts, duration, error);
  }

  return attempts > params.maxAttempts ?
    Promise.reject(new RetryError(params.maxAttempts)) :
    Promise.resolve(params.supplier())
      .catch(resolveIf(
        (caughtError: E) => params.errorEquals(caughtError),
        (caughtError: E) => defer<T>(duration)(() => retrying(params, attempts + 1, caughtError))
      ));
}

const retryDefaults = {
  backOffRate: 2,
  errorEquals: () => true,
  intervalMilliseconds: 1000,
  maxAttempts: 3,
  onRetry: () => void 0
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
 * @param {RetryParams<T, E>} params - Retry parameters.
 * @returns {Promise<T>} The result of the `supplier`.
 */
export function retry<T, E>(params: RetryParams<T, E>): Promise<T> {
  const {
    backOffRate = retryDefaults.backOffRate,
    errorEquals = retryDefaults.errorEquals,
    intervalMilliseconds = retryDefaults.intervalMilliseconds,
    maxAttempts = retryDefaults.maxAttempts,
    onRetry = retryDefaults.onRetry,
    supplier
  } = params;

  return retrying({
    backOffRate,
    errorEquals,
    intervalMilliseconds,
    maxAttempts,
    onRetry,
    supplier
  });
}
