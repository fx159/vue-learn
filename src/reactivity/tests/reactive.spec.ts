import { reactive } from "../reactive";

//@ts-ignore
describe("reactive", () => {
  //@ts-ignore
  it("init reactive", () => {
    const rawObj = {
      foo: 1,
    };
    let observed = reactive(rawObj);
    //@ts-ignore
    expect(rawObj).not.toBe(observed);
    //@ts-ignore
    expect(observed.foo).toBe(1);
  });
});
