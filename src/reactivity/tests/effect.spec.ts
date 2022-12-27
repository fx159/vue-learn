//@ts-ignore
import { effect } from "../effect";
import { reactive } from "../reactive";
describe("effect", () => {
  //@ts-ignore
  it("reactive", () => {
    const user = reactive({
      age: 10,
    });
    let age;
    effect(() => {
      age = user.age + 1;
    });
    expect(age).toBe(11);
    user.age++;
    expect(age).toBe(12);
  });
});
