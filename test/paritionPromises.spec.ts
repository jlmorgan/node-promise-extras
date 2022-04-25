// Third Party
import Bluebird from "bluebird";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { partitionPromises } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("partitionPromises", () => {
  context("default Promise PromiseCtor", () => {
    it("should partition the rejections and fulfillments", () => {
      const testPromises = [
        Promise.resolve(0),
        Promise.reject("a"),
        Promise.resolve(1),
        Promise.reject("b")
      ];
      const actualResults = partitionPromises(testPromises);
      const expectedResults = [["a", "b"], [0, 1]];

      return expect(actualResults).to.eventually.deep.eq(expectedResults);
    });
  });

  context("custom Promise PromiseCtor", () => {
    it("should partition the rejections and fulfillments", () => {
      const testPromises = [
        Promise.resolve(0),
        Promise.reject("a"),
        Promise.resolve(1),
        Promise.reject("b")
      ];
      const actualResults = partitionPromises(testPromises, Bluebird);
      const expectedResults = [["a", "b"], [0, 1]];

      return expect(actualResults).to.eventually.deep.eq(expectedResults);
    });
  });
});
