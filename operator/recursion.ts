type T1 = [string, number, boolean, void, Function]
type T2<key> = key extends number ? 'yes' : 'no'

type T3<T1, C extends string[] = []> = T1 extends [infer M, ...infer N] ? 
  N extends [] ? 
      [...C, T2<M>]
      : 
      T3<N, [...C, T2<M>]>
    : 
    never

type T4 = T3<T1>
