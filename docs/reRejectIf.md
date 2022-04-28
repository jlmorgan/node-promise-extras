# `reRejectIf(predicate, morphism)`

```typescript
function reRejectIf<E, T>(predicate: Predicate<T>, morphism: Func<E, E>): BindPromise<T, T>;
```

Creates a function that rejects with the result of the `morphism` if the `predicate` returns `true` such as replacing one error type for another.

## Arguments

* `predicate: Predicate<T>`: Determines whether or not to transform the rejected value.
* `morphism: Func<T, E>`: Transforms the rejected value.

## Return

* `BindPromise<T, T>`: A function that takes a rejected value and returns another rejection.

## Examples

```javascript
const reRejectIfJSONParseError = context => reRejectIf(
  error => error instanceof SyntaxError,
  error => new CustomSyntaxError("Error while parsing JSON", {
    cause: error,
    context
  })
);

// Resolves
const validJson = "{}";

attempt(() => JSON.parse(validJson))
  .catch(reRejectIfJSONParseError(validJson));
  // => {}

const invalidJson = "a";

attempt(() => JSON.parse(invalidJson))
  .catch(reRejectIfJSONParseError(invalidJson));
  // => CustomSyntaxError({ cause: SyntaxError, context: "a", message: "Error while parsing JSON" })
```
