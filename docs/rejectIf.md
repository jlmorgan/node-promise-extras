# `rejectIf<T, E>(predicate: Predicate<T>, rejection: Func<T, E>): Func<T, Promise<T>>`

Rejects with the `rejection` if the `predicate` returns `true`.

## Arguments

* `predicate: Predicate<T>`: Determines whether or not to reject the `Promise`.
* `rejection: Func<T, E>`: Provides the rejection for the given `value`.

## Return

* `Func<T, Promise<T>>`: A function that takes a value and returns a Promise.

## Examples

```javascript
const rejectIfEven = rejectIf(
  value => value % 2 === 0,
  value => new TypeError(`value ${value} must be odd`)
);
const rejectIfOverMaximum = rejectIf(
  value => value > 10,
  value => new TypeError(`value ${value} must less than 10`)
);

// Resolves
Promise.resolve(5)
  .then(rejectIfEven)
  .then(rejectIfOverMaximum); // 5

// Rejects
Promise.resolve(2)
  .then(rejectIfEven)
  .then(rejectIfOverMaximum); // TypeError("value 2 must be odd")

Promise.resolve(13)
  .then(rejectIfEven)
  .then(rejectIfOverMaximum); // TypeError("value 13 must be less than 10")
```
