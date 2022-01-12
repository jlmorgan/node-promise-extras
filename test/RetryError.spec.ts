// Third Party
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { RetryError } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("RetryError", () => {
  it("should not retry for first resolve", () => {
    const testError = new RetryError(0);
    const actualResult = testError.toJSON();
    const expectedResult = {
      count: 0,
      message: "Exceeded maximum number of retry attempts 0"
    };

    expect(actualResult).to.eql(expectedResult);
  });
});
