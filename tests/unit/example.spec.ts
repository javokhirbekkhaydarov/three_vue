import { minus } from "@/helpers/minus/minus";
import { plus } from "@/helpers/plus/plus";

describe("minus", function () {
  test("positive", () => {
    expect(minus(5, 5)).toBe(0);
  });
  test("negative", () => {
    expect(minus(-5, -5)).toBe(0);
  });
});
describe("plus", function () {
  test("positive", () => {
    expect(plus(5, 5)).toBe(0);
  });
  test("negative", () => {
    expect(plus(+5, +5)).toBe(0);
  });
});
