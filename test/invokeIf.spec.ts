// Third Party
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { invokeIf } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("invokeIf", () => {
  const testPredicate = (value: number) => value % 2 === 0;
  const testMorphism = (value: number) => value * 2;

  it("should invoke when the predicate returns true", () => {
    const testValue = 10;
    const actualResult = Promise.resolve(testValue)
      .then(invokeIf(testPredicate, testMorphism));
    const expectedResult = 20;

    return expect(actualResult).to.eventually.equal(expectedResult);
  });

  it("should not invoke when the predicate returns false", () => {
    const testValue = 1;
    const actualResult = Promise.resolve(testValue)
      .then(invokeIf(testPredicate, testMorphism));
    const expectedResult = testValue;

    return expect(actualResult).to.eventually.equal(expectedResult);
  });
});
