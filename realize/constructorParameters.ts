type T0 = ConstructorParameters<ErrorConstructor>;

type MyConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer R) => any ? R : never

let a: ErrorConstructor = Error

let b: ArrayConstructor = Array

type R21 = MyConstructorParameters<ErrorConstructor> // [message?: string]