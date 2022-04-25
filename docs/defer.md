# `defer(duration)`

```typescript
function defer<T>(duration: number): Func<SupplierPromise<T>, Promise<T>>;
```

Creates a function that applies the `morphism` if the `predicate` returns `true`.

## Arguments

* `duration: number`: Duration of time in milliseconds to wait before execution.

## Return

* `Func<SupplierPromise<T>, Promise<T>>`: A function that takes a supplier and returns a promise of the result after waiting the `duration`.

## Examples

```javascript
const started = Date.now();
const wait1Second = defer(1000);

wait1Second(() => console.log(`Waited for ${Date.now() - started} milliseconds`));
```
