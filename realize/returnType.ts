type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
type Test1 = MyReturnType<() => boolean> // true
type Test2 = ReturnType<() => boolean> // true