// Third Party
import Bluebird from "bluebird";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { defer } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("defer", () => {
  describe("default Promise PromiseCtor", () => {
    it("should return the result after waiting", () => {
      const testDuration = 100; // Milliseconds
      const testStartTime = Date.now();
      const testSupplier = () => Date.now();
      const actualResult = defer<number>(testDuration)(testSupplier)
        .then(testEndTime => testEndTime - testStartTime >= testDuration);

      return expect(actualResult).to.eventually.be.true;
    });
  });

  describe("custom Promise PromiseCtor", () => {
    it("should return the result after waiting", () => {
      const testDuration = 100; // Milliseconds
      const testStartTime = Date.now();
      const testSupplier = () => Date.now();
      const actualResult = defer<number>(testDuration, Bluebird)(testSupplier)
        .then(testEndTime => testEndTime - testStartTime >= testDuration);

      return expect(actualResult).to.eventually.be.true;
    });
  });
});
