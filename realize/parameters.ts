type MyParameters<T> = T extends (...args: infer R) => any ? R : never

declare function foo(a: string, b: number): any

type R17 = MyParameters<typeof foo> // [a: string, b: number]
type R18 = Parameters<typeof foo> // [a: string, b: number]