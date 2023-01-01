class ReactiveEffect {
  private _fn: any;
  public scheduler: Function | undefined;
  deps: any = [];
  active = true;
  onStop?: () => void | undefined;
  constructor(fn: any, scheduler?: Function | undefined) {
    this._fn = fn;
    this.scheduler = scheduler;
  }
  run() {
    activeEffect = this;
    return this._fn();
  }

  stop() {
    if (this.active) {
      clearDep(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

function clearDep(effect: any) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
}

let activeEffect: any;
const targetMap = new Map();
export function track(target: any, key: any) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(activeEffect);
  if (!activeEffect) return;
  activeEffect.deps.push(dep);
}

export function trigger(target: any, key: string | symbol) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

export function effect(fn: any, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  Object.assign(_effect, options);
  _effect.run();
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;

  return runner;
}

export function stop(runner: any) {
  runner.effect.stop();
}
