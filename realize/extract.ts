type MyExtract<T, U> = T extends U ? T : never;

type R13 = MyExtract<1 | 2 | 3, 3> // 3

type R14 = Extract<1 | 2 | 3, 3> // 3