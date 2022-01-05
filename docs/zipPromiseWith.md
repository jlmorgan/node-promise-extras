# `zipPromiseWith(f, g)`

```typescript
function zipPromiseWith<A, B, C, E>(f: Func2<B, A, C>, g: Func2<B, E, C>): Func2<Promise<B>, Promise<A>, Promise<C>>;
```

Zips the two promises.

## Arguments

* `f: Func2<B, A, C>`: Zips the fulfilled value of `Promise<B>` with the fulfilled value of `Promise<A>`.
* `g: Func2<B, E, C>`: Zips the fulfilled value of `Promise<B>` with the rejected value of `Promise<A>`.

## Return

* `Func2<Promise<B>, Promise<A>, Promise<C>>`: A function that takes the fulfilled `Promise<B>` and `Promise<A>` and returns a `Promise` of the zipped result.

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
