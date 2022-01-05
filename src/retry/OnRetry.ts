
export interface OnRetry<E> {
  /**
   * @param {number} attempts - Number of retry attempts made.
   * @param {number} delay - Delay in milliseconds for the current retry attempt.
   * @param {E} [error] - Possible error captured during retry.
   */
  (attempts: number, delay: number, error?: E): void;
}
