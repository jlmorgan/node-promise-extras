// Third Party
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { resolveIf } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("resolveIf", () => {
  const testResolution = (_error: Error) => 1;

  it("should resolve with a value when the predicate returns true", () => {
    const testPredicate = (error: Error) => error instanceof TypeError;
    const testError = new TypeError();
    const actualResult = Promise.reject(testError)
      .catch(resolveIf(testPredicate, testResolution));
    const expectedResult = 1;

    return expect(actualResult).to.eventually.equal(expectedResult);
  });

  it("should reject with the error when the predicate returns false", () => {
    const testPredicate = (error: Error) => Promise.resolve(error instanceof TypeError);
    const testError = new Error("Unknown error");
    const actualResult = Promise.reject(testError)
      .catch(resolveIf(testPredicate, testResolution));
    const expectedType = Error;
    const expectedMessage = "Unknown error";

    return expect(actualResult).to.eventually.rejectedWith(expectedType, expectedMessage);
  });
});
