# `resolveIf<E, T>(predicate: Predicate<E>, resolution: Func<E, T>): Func<E, Promise<T>>`

Resolves with the `resolution` if the `predicate` returns `true`.

## Arguments

* `predicate: Predicate<E>`: Determines whether or not to resolve the rejected `Promise`.
* `resolution: Func<E, T>`: Provides the resolution for the given `value`.

## Return

* `Func<E, Promise<T>>`: A function that takes a rejected value and returns a Promise.

## Examples

```javascript
const resolveIfTypeError = resolveIf(
  value => value instanceof TypeError,
  value => 0
);
const resolveIfRangeError = resolveIf(
  value => value instanceof RangeError,
  value => -1
);

// Rejects
Promise.reject(new Error("Unknown error"))
  .then(resolveIfTypeError)
  .then(resolveIfRangeError); // Error("Unknown error")

// Resolves
Promise.resolve(new TypeError("value must be a number"))
  .then(resolveIfTypeError)
  .then(resolveIfRangeError); // 0

Promise.resolve(new RangeError("value out of range"))
  .then(resolveIfTypeError)
  .then(resolveIfRangeError); // -1
```
