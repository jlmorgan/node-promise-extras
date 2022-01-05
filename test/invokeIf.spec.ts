// Third Party
import Bluebird from "bluebird";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { invokeIf } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("invokeIf", () => {
  const testMorphism = (value: number) => value * 2;

  describe("default Promise PromiseCtor", () => {
    it("should invoke when the predicate returns true", () => {
      const testPredicate = (value: number) => value % 2 === 0;
      const testValue = 10;
      const actualResult = Promise.resolve(testValue)
        .then(invokeIf(testPredicate, testMorphism));
      const expectedResult = 20;

      return expect(actualResult).to.eventually.equal(expectedResult);
    });

    it("should not invoke when the predicate returns false", () => {
      const testPredicate = (value: number) => Promise.resolve(value % 2 === 0);
      const testValue = 1;
      const actualResult = Promise.resolve(testValue)
        .then(invokeIf(testPredicate, testMorphism));
      const expectedResult = testValue;

      return expect(actualResult).to.eventually.equal(expectedResult);
    });
  });

  describe("custom Promise PromiseCtor", () => {
    it("should invoke when the predicate returns true", () => {
      const testPredicate = (value: number) => value % 2 === 0;
      const testValue = 10;
      const actualResult = Promise.resolve(testValue)
        .then(invokeIf(testPredicate, testMorphism, Bluebird));
      const expectedResult = 20;

      return expect(actualResult).to.eventually.equal(expectedResult);
    });

    it("should not invoke when the predicate returns false", () => {
      const testPredicate = (value: number) => Promise.resolve(value % 2 === 0);
      const testValue = 1;
      const actualResult = Promise.resolve(testValue)
        .then(invokeIf(testPredicate, testMorphism, Bluebird));
      const expectedResult = testValue;

      return expect(actualResult).to.eventually.equal(expectedResult);
    });
  });
});
