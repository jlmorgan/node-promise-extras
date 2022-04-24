# `attempt(supplier, PromiseCtor = Promise)`

```typescript
function attempt<T>(supplier: SupplierPromise<T>, PromiseCtor = Promise);
```

Captures the possible `Error` in a rejection; otherwise, the fulfilled `value`.

## Arguments

* `SupplierPromise<T> supplier` A supplier of a value.
* `PromiseCtor: PromiseConstructor = Promise`:  Optional Promise constructor implementation.

## Return

* `Promise<T>` The fulfilled supplied value or a rejection of the error.

## Examples

```javascript
attempt(someFunctionThatReturns); // someValue

attempt(someFunctionThatThrows); // Error()
```
