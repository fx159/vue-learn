import { mutableHandlers, readonlyHandlers } from "./baseHandles";

export function reactive(raw: any) {
  return createHandler(raw, mutableHandlers);
}

export function readonly(raw: any) {
  return createHandler(raw, readonlyHandlers);
}

function createHandler(raw: any, baseHandlers: any) {
  return new Proxy(raw, baseHandlers);
}
