type MyExclude<T, U> = T extends U ? never : T;

type A = number | string | boolean

type R9 = MyExclude<A, string> // number | boolean
type R10 = Exclude<A, string> // number | boolean