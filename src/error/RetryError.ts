export class RetryError extends Error {
  public count: number;

  constructor(count: number) {
    super(`Exceeded maximum number of retry attempts ${count}`);

    this.count = count;
    this.name = "RetryError";

    Error.captureStackTrace(this, RetryError);
  }

  /**
   * Provides the JSON representation of the {@link ConfigError}.
   *
   * @return {object} The JSON representation.
   */
  toJSON(): object {
    return {
      count: this.count,
      message: this.message
    };
  }

  /**
   * Serializes the error as a string.
   *
   * @return {string} The string representation.
   */
  toString(): string {
    return `${this.name}: ${this.message}`;
  }
}
