// Third Party
import Bluebird from "bluebird";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { RetryError, retry } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("retry", () => {
  context("default Promise PromiseCtor", () => {
    const testParams = {
      intervalMilliseconds: 10
    };

    it("should not retry for first resolve", () => {
      const testSupplier = () => Promise.resolve("success");
      const actualResult = retry({
        supplier: testSupplier
      });
      const expectedResult = "success";

      return expect(actualResult).to.eventually.equal(expectedResult);
    });

    it("should not retry when errorEquals returns false", () => {
      const testErrorEquals = (error: Error) => error instanceof RangeError;
      const testSupplier = (function() {
        let count = -1;

        return function supplier() {
          count += 1;

          switch (count) {
            case 1: return Promise.reject(new TypeError("unexpected error"));

            default: return Promise.reject(new RangeError("expected error"));
          }
        };
      }());
      const actualResult = retry({
        ...testParams,
        errorEquals: testErrorEquals,
        supplier: testSupplier
      });
      const expectedMessage = "unexpected error";
      const expectedType = TypeError;

      return expect(actualResult).to.eventually.rejectedWith(expectedType, expectedMessage);
    });

    it("should not retry when maxAttempts is exceeded", () => {
      const testSupplier = () => Promise.reject(new Error());
      const actualResult = retry({
        ...testParams,
        supplier: testSupplier
      });
      const expectedMessage = "Exceeded maximum number of retry attempts 3";
      const expectedType = RetryError;

      return expect(actualResult).to.eventually.rejectedWith(expectedType, expectedMessage);
    });
  });

  context("custom Promise PromiseCtor", () => {
    const testParams = {
      intervalMilliseconds: 10,
      PromiseCtor: Bluebird
    };

    it("should not retry for first resolve", () => {
      const testSupplier = () => Promise.resolve("success");
      const actualResult = retry({
        supplier: testSupplier
      });
      const expectedResult = "success";

      return expect(actualResult).to.eventually.equal(expectedResult);
    });

    it("should not retry when errorEquals returns false", () => {
      const testErrorEquals = (error: Error) => error instanceof RangeError;
      const testSupplier = (function() {
        let count = -1;

        return function supplier() {
          count += 1;

          switch (count) {
            case 1: return Promise.reject(new TypeError("unexpected error"));

            default: return Promise.reject(new RangeError("expected error"));
          }
        };
      }());
      const actualResult = retry({
        ...testParams,
        errorEquals: testErrorEquals,
        supplier: testSupplier
      });
      const expectedMessage = "unexpected error";
      const expectedType = TypeError;

      return expect(actualResult).to.eventually.rejectedWith(expectedType, expectedMessage);
    });

    it("should not retry when maxAttempts is exceeded", () => {
      const testSupplier = () => Promise.reject(new Error());
      const actualResult = retry({
        ...testParams,
        supplier: testSupplier
      });
      const expectedMessage = "Exceeded maximum number of retry attempts 3";
      const expectedType = RetryError;

      return expect(actualResult).to.eventually.rejectedWith(expectedType, expectedMessage);
    });
  });
});
