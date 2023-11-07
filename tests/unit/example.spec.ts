import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import { minus } from "@/helpers/minus/minus";
describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("minus", function () {
  test("positive", () => {
    expect(minus(5, 5)).toBe(0);
  });
  test("negative", () => {
    expect(minus(-5, -5)).toBe(0);
  });
});
