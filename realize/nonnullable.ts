type MyNonNullable<T> = T extends null | undefined ? never : T

type R15 = MyNonNullable<string | null | undefined> // string
type R16 = NonNullable<string | null | undefined> // string