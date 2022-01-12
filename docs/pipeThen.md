# `pipeThen(f, g, PromiseCtor = Promise)`

```typescript
function pipeThen<A, B, C>(f: OnFulfilled<A, B>, g: OnFulfilled<B, C>): Func<A | PromiseLike<A>, Promise<A | B | C>>;
```

Composes two functions; applying `f` before `g`.

## Arguments

* `f: OnFulfilled<A, B>`: The first function.
* `g: OnFulfilled<B, C>`: The second function.
* `PromiseCtor: PromiseConstructor = Promise`: Optional Promise constructor implementation.

## Return

* `Func<A | PromiseLike<A>, Promise<A | B | C>>`: A function that takes a value or promise-like value and returns the result of the piped functions.

## Examples

```javascript
const add = a => b => a + b;
const rejectIfOdd = rejectIf(
  value => value % 2 !== 0,
  value => new TypeError(`value must be even; found ${value}`)
);

// Resolves
pipeThen(add(2), add(1))(2);
  // => Fulfilled(5)
pipeThen(add(2), rejectIfOdd)(2);
  // => Fulfilled(4)
pipeThen(add(1), rejectIfOdd)(Promise.resolve(1));
  // => Fulfilled(2)

// Rejects
pipeThen(add(1), rejectIfOdd)(0);
  // => Rejected(TypeError("value must be even; found 1"))
```
