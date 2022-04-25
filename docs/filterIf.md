# `filterIf(predicate, rejection)`

```typescript
function filterIf<T, E>(predicate: PredicatePromise<T>, rejection: Func<T, E>): BindPromise<T, T>;
```

Creates a function that rejects with the result of the `rejection` if the `predicate` returns `false`.

## Arguments

* `predicate: PredicatePromise<T>`: Determines whether or not to filter the `Promise`.
* `rejection: Func<T, E>`: Provides the rejection for the given `value`.

## Return

* `BindPromise<T, T>`: A function that takes a value and returns a `Promise`.

## Examples

```javascript
const filterIfEven = filterIf(
  value => value % 2 === 0,
  value => new TypeError(`value must be even; found ${value}`)
);
const filterIfOverMaximum = filterIf(
  value => Promise.resolve(value > 10),
  value => new RangeError(`value must less than 10; found ${value}`)
);

// Resolves
Promise.resolve(4)
  .then(filterIfEven)
  .then(filterIfOverMaximum); // 4

// Rejects
Promise.resolve(3)
  .then(filterIfEven)
  .then(filterIfOverMaximum); // TypeError("value must be even; found 3")

Promise.resolve(12)
  .then(filterIfEven)
  .then(filterIfOverMaximum); // RangeError("value must be less than 10; found 12")
```
