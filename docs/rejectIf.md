# `rejectIf<T, E>(predicate: PredicatePromise<T>, rejection: Func<T, E>): Func<T, Promise<T>>`

Creates a function that rejects with the result of the `rejection` if the `predicate` returns `true`.

## Arguments

* `predicate: PredicatePromise<T>`: Determines whether or not to reject the `Promise`.
* `rejection: Func<T, E>`: Provides the rejection for the given `value`.

## Return

* `Func<T, Promise<T>>`: A function that takes a value and returns a `Promise`.

## Examples

```javascript
const rejectIfEven = rejectIf(
  value => value % 2 === 0,
  value => new TypeError(`value must be odd; found ${value}`)
);
const rejectIfOverMaximum = rejectIf(
  value => Promise.resolve(value > 10),
  value => new TypeError(`value must less than 10; found ${value}`)
);

// Resolves
Promise.resolve(5)
  .then(rejectIfEven)
  .then(rejectIfOverMaximum); // 5

// Rejects
Promise.resolve(2)
  .then(rejectIfEven)
  .then(rejectIfOverMaximum); // TypeError("value must be odd; found 2")

Promise.resolve(13)
  .then(rejectIfEven)
  .then(rejectIfOverMaximum); // TypeError("value must be less than 10; found 13")
```
