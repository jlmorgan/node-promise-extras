// Third Party
import Bluebird from "bluebird";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { attempt, defer } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("attempt", () => {
  function testFn(value: number): number {
    if (value % 2 === 0) {
      return value;
    }

    throw new TypeError("value must be even");
  }

  context("default Promise PromiseCtor", () => {
    it("should fulfill with the value", () => {
      const testValue = 2;
      const expectedResult = 2;
      const actualResult = attempt(() => testFn(testValue));

      return expect(actualResult).to.eventually.equal(expectedResult);
    });

    it("should reject with the error", () => {
      const testValue = 1;
      const expectedMessage = "value must be even";
      const expectedType = TypeError;
      const actualResult = attempt(() => testFn(testValue));

      return expect(actualResult).to.eventually.be.rejectedWith(expectedType, expectedMessage);
    });
  });

  context("custom Promise PromiseCtor", () => {
    it("should fulfill with the value", () => {
      const testValue = 2;
      const expectedResult = 2;
      const actualResult = attempt(() => testFn(testValue), Bluebird);

      return expect(actualResult).to.eventually.equal(expectedResult);
    });

    it("should reject with the error", () => {
      const testValue = 1;
      const expectedMessage = "value must be even";
      const expectedType = TypeError;
      const actualResult = attempt(() => testFn(testValue), Bluebird);

      return expect(actualResult).to.eventually.be.rejectedWith(expectedType, expectedMessage);
    });
  });
});
