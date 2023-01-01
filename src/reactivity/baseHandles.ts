import { track, trigger } from "./effect";
function createGetter(isReadonly = false) {
  return function (target: object, key: PropertyKey) {
    const res = Reflect.get(target, key);
    if (!isReadonly) {
      // 依赖收集
      track(target, key);
    }
    return res;
  };
}

function createSetter() {
  return function (target: any, key: any, value: any) {
    const res = Reflect.set(target, key, value);
    // 触发更新
    trigger(target, key);
    return res;
  };
}

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

export const mutableHandlers = {
  get,
  set,
};

export const readonlyHandlers = {
  get: readonlyGet,
  set(target: any, key: any) {
    console.warn(`${target} value is readony!,${target[key]}`);
    return true;
  },
};
