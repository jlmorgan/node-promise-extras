# `fulfillments(promises)`

```typescript
function fulfillments<T>(promises: Promise<T>[]): Promise<T[]>;
```

Extracts from a list of `Promise` all of the `fulfilled` elements in extracted order.

## Arguments

* `promises: Promise<T>[]`: List of promises.

## Return

* `Promise<T[]>`: List of the fulfilled values.

## Examples

```javascript
const promises = [
  Promise.resolve(0),
  Promise.reject(new Error("Unknown error")),
  Promise.resolve(1),
  Promise.reject(new Error("Unknown error")),
];

fulfillments(promises);
  // => Promise([0, 1])
```
