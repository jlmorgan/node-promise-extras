// Third Party
import Bluebird from "bluebird";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { fulfillments } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("fulfillments", () => {
  describe("default Promise PromiseCtor", () => {
    it("should return the fulfillments", () => {
      const testPromises = [
        Promise.resolve(0),
        Promise.reject("a"),
        Promise.resolve(1),
        Promise.reject("b")
      ];
      const actualResults = fulfillments(testPromises);
      const expectedResults = [0, 1];

      return expect(actualResults).to.eventually.deep.eq(expectedResults);
    });
  });

  describe("custom Promise PromiseCtor", () => {
    it("should return the fulfillments", () => {
      const testPromises = [
        Promise.resolve(0),
        Promise.reject("a"),
        Promise.resolve(1),
        Promise.reject("b")
      ];
      const actualResults = fulfillments(testPromises, Bluebird);
      const expectedResults = [0, 1];

      return expect(actualResults).to.eventually.deep.eq(expectedResults);
    });
  });
});
