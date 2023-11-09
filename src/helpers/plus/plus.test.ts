import { plus } from "./plus";

describe("plus", function () {
  test("positive", () => {
    expect(plus(5, 5)).toBe(0);
  });
  test("negative", () => {
    expect(plus(+5, +5)).toBe(0);
  });
});
