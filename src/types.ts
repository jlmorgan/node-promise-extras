export type None = null | undefined;

export interface Consumer<A> {
  (a: A): void;
}

export interface Func<A, B> {
  (a: A): B;
}

export interface Func2<A, B, C> {
  (a: A, b: B): C;
}

export interface Predicate<T> {
  (value: T): boolean;
}

export interface PredicatePromise<T> {
  (value: T): boolean | Promise<boolean>;
}

export interface Supplier<T> {
  (): T;
}

export type OnFulfilled<T, U = never> = Func<T, U | PromiseLike<U>> | None;
