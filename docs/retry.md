# `retry(params)`

```typescript
function retry<T, E>(params: RetryParams<T, E>): Promise<T>;
```

Retries the `supplier` when `errorEquals` returns `true` by waiting `intervalMilliseconds` (`i`) multiplied by the `backOffRate` (`b`) to the power of the number of `attempts` (`a`) (i.e., `i * b ^ a`) made until the `maxAttempts` is reached. For a fully failed example with defaults,

1. Executes `supplier` and fails.
1. Retry after 1 second (1 * 2 ^ 0) and fails.
1. Retry after 2 seconds (1 * 2 ^ 1) and fails.
1. Retry after 4 seconds (1 * 2 ^ 2) and fails.
1. Rejects with failure.

## Arguments

* `params: RetryParams<T, E>`: Retry params.
  * `backOffRate?: number`: Base back off rate used to compute the delay before the next retry (default `2`).
  * `errorEquals?: PredicatePromise<E>`: Determines whether or not retries should continue based on the rejected/caught value (default always returns `true`).
  * `intervalMilliseconds?: number`: Base interval to delay before retrying in milliseconds (default `1000`).
  * `maxAttempts?: number`: Maximum number of retry attempts to make (default `3`).
  * `onRetry?: OnRetry<E>`: Side effect to execute upon each retry attempt (default does nothing; see [OnRetry][]).
  * `PromiseCtor?: PromiseConstructor`: Optional Promise constructor implementation.
  * `supplier: SupplierPromise<T>`: Value supplying function to execute for each retry attempt.

## Return

* `Promise<T>`: The result of the `supplier`.

## Examples

```javascript
// Using a fictional client that returns categorical errors.
function getItem(id) {
  return retry({
    errorEquals: error => error instanceof ServerError,
    onRetry: (attempts, delay, error) => console.error({ attempts, delay, error }),
    supplier: () => client.get(id)
  });
}

// First attempt succeeds
getItem("1"); // => Promise(ApiResponse)

// Two attempts fail, but ultimately succeeds
getItem("2"); // => Promise(ApiResponse)

// Max attempts exceeded
getItem("3"); // => RetryError("Exceeded maximum number of retry attempts 3")
```

[OnRetry]: ../src/retry/OnRetry.ts
