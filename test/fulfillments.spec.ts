// Third Party
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { fulfillments } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("fulfillments", () => {
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
