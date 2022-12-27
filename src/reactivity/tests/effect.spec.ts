//@ts-ignore
import { effect } from "../effect";
import { reactive } from "../reactive";
describe("effect", () => {
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

  it("should return runner", () => {
    let foo = 1;
    const run = effect(() => {
      foo++;
      return "runner";
    });
    expect(foo).toBe(2);
    let runner = run();
    expect(foo).toBe(3);
    expect(runner).toBe("runner");
  });
});
