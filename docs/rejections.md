# `rejections(promises)`

```typescript
function rejections<T, E>(promises: Promise<T>[]): Promise<E[]>;
```

Extracts from a list of `Promise` all of the `rejected` elements in extracted order.

## Arguments

* `promises: Promise<T>[]`: List of promises.

## Return

* `Promise<E[]>`: List of the rejected values.

## Examples

```javascript
const promises = [
  Promise.resolve(0),
  Promise.reject(new Error("Known error")),
  Promise.resolve(1),
  Promise.reject(new Error("Unknown error")),
];

rejections(promises);
  // => Promise([Error("Known error"), Error("Unknown error")])
```
