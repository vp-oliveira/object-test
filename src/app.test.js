import { Letter } from "./letter.js";
require("jest-fetch-mock").enableMocks();

describe("Test - letter.js", () => {
  it("should make a API call with param 1", async () => {
    await new Letter("1").get();
    expect(fetch).toHaveBeenCalled();
  });
});
