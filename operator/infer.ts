type Arr = [1, 2, 3, 4]

type R1 = Arr extends [infer M, ...infer N] ? M : never // 1

type R2<T extends unknown[]> = T extends (infer U)[] ? U : never

type R3 = R2<string[]> // string

type R4<T extends Function> = T extends (...args: any) => infer R ? R : never;

type R5 = R4<() => boolean> // boolean
// 等同于type R5 = ReturnType<() => boolean>


type R = Arr extends [infer M, ...infer N] ? M : N 