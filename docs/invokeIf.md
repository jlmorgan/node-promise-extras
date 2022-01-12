# `invokeIf(predicate, morphism, PromiseCtor = Promise)`

```typescript
function invokeIf<T, U>(predicate: PredicatePromise<T>, morphism: Func<T, U>): BindPromise<T, T | U>;
```

Creates a function that applies the `morphism` if the `predicate` returns `true`.

## Arguments

* `predicate: PredicatePromise<T>`: Determines whether or not to invoke the `morphism`.
* `morphism: Func<T, U>`: The morphism.
* `PromiseCtor: PromiseConstructor = Promise`: Optional Promise constructor implementation.

## Return

* `BindPromise<T, T | U>`: A function that takes a value and returns a `Promise`.

## Examples

```javascript
const incrementIfEven = invokeIf(
  value => value % 2 === 0,
  value => value + 1
);
const doubleIfOdd = invokeIf(
  value => Promise.resolve(value % 2 === 1),
  value => value * 2
);
const halfIfOver50 = invokeIf(
  value => value > 50,
  value => value / 2
);

Promise.resolve(10)
  .then(incrementIfEven) // 11
  .then(doubleIfOdd) // 22
  .then(halfIfOver50); // 22
```
