//@ts-ignore
import { effect, stop } from "../effect";
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

  it("stop", () => {
    let dummy;
    const obj = reactive({ prop: 1 });
    const runner = effect(() => {
      dummy = obj.prop;
    });
    obj.prop = 2;
    expect(dummy).toBe(2);
    stop(runner);
    obj.prop = 3;
    expect(dummy).toBe(2);

    runner();

    expect(dummy).toBe(3);
  });
});
