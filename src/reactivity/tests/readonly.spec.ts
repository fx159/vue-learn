import { readonly } from "../reactive";
describe("readOnly", () => {
  it("readOnly", () => {
    console.warn = jest.fn();
    const obj = { foo: 1 };
    const readonlyObj = readonly(obj);
    expect(readonlyObj).not.toBe(obj);
    readonlyObj.foo = 2;
    expect(console.warn).toBeCalled();
  });
});
