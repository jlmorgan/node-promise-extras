// Third Party
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { reRejectIf } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("reRejectIf", () => {
  const testMorphism = (_error: Error) => new TypeError("incorrect type");
  const testPredicate = (error: Error) => error instanceof ReferenceError;

  it("should reject with the transformed error when the predicate returns true", () => {
    const testError = new ReferenceError("bad reference");
    const actualResult = Promise.reject(testError)
      .catch(reRejectIf(testPredicate, testMorphism));
    const expectedType = TypeError;
    const expectedMessage = "incorrect type";

    return expect(actualResult).to.eventually.rejectedWith(expectedType, expectedMessage);
  });

  it("should reject with the error when the predicate returns false", () => {
    const testError = new Error("Unknown error");
    const actualResult = Promise.reject(testError)
      .catch(reRejectIf(testPredicate, testMorphism));
    const expectedType = Error;
    const expectedMessage = "Unknown error";

    return expect(actualResult).to.eventually.rejectedWith(expectedType, expectedMessage);
  });
});
