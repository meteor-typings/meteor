declare var ReactiveVar: ReactiveVarStatic;
interface ReactiveVarStatic {
  new <T>(initialValue: T, equalsFunc?: Function): ReactiveVar<T>;
}
interface ReactiveVar<T> {
  get(): T;
  set(newValue: T): void;
}
