// Third Party
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { randomUUID } from "crypto";

// Project
import { RetryError } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("RetryError", () => {
  it("should return the shape used to serialize to JSON", () => {
    const testMessage = randomUUID();
    const testCause = new Error(testMessage);
    const testError = new RetryError(0, testCause);
    const actualResult = testError.toJSON();
    const expectedResult = {
      cause: testCause,
      count: 0,
      message: "Exceeded maximum number of retry attempts 0"
    };

    expect(actualResult).to.eql(expectedResult);
  });
});
