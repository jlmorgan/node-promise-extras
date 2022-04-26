// Third Party
import Bluebird from "bluebird";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { pipeThen } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("pipeThen", () => {
  it("should apply both functions", () => {
    const testPromise = Promise.resolve(1);
    const testFirstFunction = (value: number) => value + 1;
    const testSecondFunction = (value: number) => Promise.resolve(value * 2);
    const actualResult = pipeThen(testFirstFunction, testSecondFunction)(testPromise);
    const expectedResult = 4;

    return expect(actualResult).to.eventually.equal(expectedResult);
  });
});
