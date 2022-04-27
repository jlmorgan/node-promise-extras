// Third Party
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

// Project
import { rejections } from "../src";

// Setup
chai.use(chaiAsPromised);
const { expect } = chai;

describe("rejections", () => {
  it("should return the rejections", () => {
    const testPromises = [
      Promise.resolve(0),
      Promise.reject("a"),
      Promise.resolve(1),
      Promise.reject("b")
    ];
    const actualResults = rejections(testPromises);
    const expectedResults = ["a", "b"];

    return expect(actualResults).to.eventually.deep.eq(expectedResults);
  });
});
