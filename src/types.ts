export type None = null | undefined;

export interface Action {
  (): void;
}

export interface BindPromise<A, B> {
  (a: A): PromiseLike<B>;
}

export interface Consumer<A> {
  (a: A): void;
}

export interface Func<A, B> {
  (a: A): B;
}

export interface FuncPromise<A, B> {
  (a: A): B | PromiseLike<B>;
}

export interface Func2<A, B, C> {
  (a: A, b: B): C;
}

export interface Predicate<T> {
  (value: T): boolean;
}

export interface PredicatePromise<T> {
  (value: T): boolean | PromiseLike<boolean>;
}

export interface Supplier<T> {
  (): T;
}

export interface SupplierPromise<T> {
  (): T | PromiseLike<T>;
}

export interface OnFulfilled<T, TResult1 = T> {
  (value: T): TResult1 | PromiseLike<TResult1>;
}

export interface OnRejected<TResult2 = never> {
  (reason: any): TResult2 | PromiseLike<TResult2>;
}

export interface PromiseConstructor {
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
  reject<T = never>(reason?: any): Promise<T>;
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
}

export interface PromiseExecutor<T> {
  (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void): void;
}
