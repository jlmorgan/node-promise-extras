// Third Party
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { zipPromiseWith } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("zipPromiseWith", () => {
  const testFulfilledZip = (b: number, a: number) => b * a;
  const testRejectedZip = (_b: number, _a: Error) => 0;

  it("should return the zipped result for a fulfilled promise", () => {
    const testPromiseA = Promise.resolve(10);
    const testPromiseB = Promise.resolve(2);
    const actualResults = zipPromiseWith(testFulfilledZip, testRejectedZip)(testPromiseB, testPromiseA);
    const expectedResults = 20;

    return expect(actualResults).to.eventually.deep.eq(expectedResults);
  });

  it("should return the zipped result for a rejected promise", () => {
    const testPromiseA = Promise.reject(new Error());
    const testPromiseB = Promise.resolve(2);
    const actualResults = zipPromiseWith(testFulfilledZip, testRejectedZip)(testPromiseB, testPromiseA);
    const expectedResults = 0;

    return expect(actualResults).to.eventually.deep.eq(expectedResults);
  });

  it("should reject for an initial rejection", () => {
    const testValue = new Error("Unknown error");
    const testPromiseA = Promise.resolve(10);
    const testPromiseB = Promise.reject(testValue);
    const actualResults = zipPromiseWith(testFulfilledZip, testRejectedZip)(testPromiseB, testPromiseA);
    const expectedType = Error;
    const expectedMessage = testValue.message;

    return expect(actualResults).to.eventually.rejectedWith(expectedType, expectedMessage);
  });
});
