# `partitionPromises(promises)`

```typescript
function partitionPromises<T, E>(promises: Promise<T>[]): Promise<[E[], T[]]>;
```

Partitions a list of promises into its respective rejections and fulfillments.

## Arguments

* `promises: Promise<T>[]`: List of promises.

## Return

* `Promise<[E[], T[]]`: A tuple of the rejections and fulfillments.

## Examples

```javascript
const promises = [
  Promise.resolve(0),
  Promise.reject(new Error("Known error")),
  Promise.resolve(1),
  Promise.reject(new Error("Unknown error")),
];

partitionPromises(promises);
  // => Promise([[Error("Known error"), Error("Unknown error")], [0, 1]])
```
