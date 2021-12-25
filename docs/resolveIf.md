# `resolveIf<E, T>(predicate: PredicatePromise<E>, resolution: Func<E, T>): Func<E, Promise<T>>`

Creates a function that resolves with the result of the `resolution` if the `predicate` returns `true`.

## Arguments

* `predicate: PredicatePromise<E>`: Determines whether or not to resolve the rejected `Promise`.
* `resolution: Func<E, T>`: Provides the resolution for the given `value`.

## Return

* `Func<E, Promise<T>>`: A function that takes a rejected value and returns a `Promise`.

## Examples

```javascript
const resolveIfTypeError = resolveIf(
  value => value instanceof TypeError,
  value => 0
);
const resolveIfRangeError = resolveIf(
  value => Promise.resolve(value instanceof RangeError),
  value => -1
);

// Rejects
Promise.reject(new Error("Unknown error"))
  .catch(resolveIfTypeError)
  .catch(resolveIfRangeError); // Error("Unknown error")

// Resolves
Promise.resolve(new TypeError("value must be a number"))
  .catch(resolveIfTypeError)
  .catch(resolveIfRangeError); // 0

Promise.resolve(new RangeError("value out of range"))
  .catch(resolveIfTypeError)
  .catch(resolveIfRangeError); // -1
```
