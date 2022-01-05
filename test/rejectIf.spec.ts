// Third Party
import Bluebird from "bluebird";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { rejectIf } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("rejectIf", () => {
  const testRejection = (value: number) => new TypeError(`value ${value} must be odd`);

  describe("default Promise PromiseCtor", () => {
    it("should reject the value when the predicate returns true", () => {
      const testPredicate = (value: number) => value % 2 === 0;
      const testValue = 0;
      const actualResult = Promise.resolve(testValue)
        .then(rejectIf(testPredicate, testRejection));
      const expectedType = TypeError;
      const expectedMessage = "value 0 must be odd";

      return expect(actualResult).to.eventually.rejectedWith(expectedType, expectedMessage);
    });

    it("should resolve the value when the predicate returns false", () => {
      const testPredicate = (value: number) => Promise.resolve(value % 2 === 0);
      const testValue = 1;
      const actualResult = Promise.resolve(testValue)
        .then(rejectIf(testPredicate, testRejection));
      const expectedResult = testValue;

      return expect(actualResult).to.eventually.equal(expectedResult);
    });
  });

  describe("custom Promise PromiseCtor", () => {
    it("should reject the value when the predicate returns true", () => {
      const testPredicate = (value: number) => value % 2 === 0;
      const testValue = 0;
      const actualResult = Promise.resolve(testValue)
        .then(rejectIf(testPredicate, testRejection, Bluebird));
      const expectedType = TypeError;
      const expectedMessage = "value 0 must be odd";

      return expect(actualResult).to.eventually.rejectedWith(expectedType, expectedMessage);
    });

    it("should resolve the value when the predicate returns false", () => {
      const testPredicate = (value: number) => Promise.resolve(value % 2 === 0);
      const testValue = 1;
      const actualResult = Promise.resolve(testValue)
        .then(rejectIf(testPredicate, testRejection, Bluebird));
      const expectedResult = testValue;

      return expect(actualResult).to.eventually.equal(expectedResult);
    });
  });
});
